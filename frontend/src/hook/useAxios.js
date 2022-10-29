/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-finally */

import React from 'react';
import Axios from 'axios';
import { compose, get, pluck, map, toUpper } from 'lodash/fp';
import { useTranslation } from 'react-i18next';
import { notification, message } from 'antd';
// import { pageSyncLogout } from '@/utils/common';

/**
 * useAxios
 * @param {any} defaultResponse 預設從 api 回傳的格式
 * @param {boolean} useDefaultConfig 要不要使用預設的 baseurl 跟 auth token
 */
const useAxios = ({
  defaultResponse,
  globalSettingStore = null,
  useDefaultConfig = true,
  cancellable = false,
} = {}) => {
  const { t } = useTranslation();
  const defaultConfig = {
    // baseURL: env.API_URL, // 以後會從 env 進來
    withCredentials: true,
  };

  if (sessionStorage.accessToken) {
    defaultConfig.headers = { Authorization: sessionStorage.accessToken };
  }

  const axios = Axios.create(useDefaultConfig ? defaultConfig : {});
  const [isLoading, setIsLoading] = React.useState(false);
  const [response, setResponse] = React.useState(defaultResponse);
  const [errorStatus, setErrorStatus] = React.useState();

  const defaultMasssge = { key: '', data: {} };
  const toggleNotification = (
    masssge = defaultMasssge,
    error,
    callback = () => {},
    options = {}
  ) => {
    const params = { ...defaultMasssge, ...masssge };
    if (masssge.key !== '') {
      if (error.response.data && error.response.data instanceof Blob) {
        error.response.data.text().then((text) => {
          notification.error({
            ...options,
            message: params.key,
            description: text,
          });
        });
      } else {
        notification.error({
          ...options,
          message: params.key,
          description:
            error.response.data && typeof error.response.data === 'string'
              ? error.response.data
              : error.toString(),
        });
      }
      // eslint-disable-next-line no-undef
      // global.state.openNotification(params.key, params.data, error, callback);
    }
  };

  const onError = async (error, isShowError = true) => {
    // console.log('isShowError', isShowError);
    console.log('====error====');
    console.log(error);
    if (Axios.isCancel(error)) {
      // console.warn('Request canceled by user...');
    } else {
      let statudCode = 500;
      let errorKey = 'System Error';
      let errorData = {};
      if (error.response) {
        statudCode = error.response.status;
        errorKey =
          error.response.data && error.response.data.result ? error.response.data.result : errorKey;
        errorData =
          error.response.data && error.response.data.errorDesc
            ? error.response.data.errorDesc
            : errorData;
      } else if (error.request) {
        statudCode = error.request.status;
      }

      const errorObj = {
        status: statudCode,
        errorKey,
        errorData,
      };

      if (statudCode === 302) {
        console.log(error.response.data.result);
        return;
      }

      if (statudCode === 400) {
        let msg = 'System Error';

        if (error?.response?.data?.result) {
          msg = t(`SERVICE_ERROR.${error.response.data.result}`);
        }
        if (error?.response?.data?.msg) {
          msg = error?.response?.data?.msg;
        }
        if (Array.isArray(error?.response?.data)) {
          msg = compose(
            map((x) => <div>{x}</div>),
            pluck('msg'),
            get(['response', 'data'])
          )(error);
        }
        if (isShowError) {
          toggleNotification(
            {
              key: <>{msg}</>,
            },
            error
          );
        }

        // 各頁面自己處理
        throw new Error(msg);
      }

      if (statudCode === 401) {
        let msg = error.response.data;
        if (isShowError) {
          message.error(msg);
          // 還在Login畫面就不做pageSyncLogout()
          if (!toUpper(msg).includes('PASSWORD IS INCORRECT')) {
            setTimeout(() => {
              pageSyncLogout();
            }, 1000);
          }
        }
        return;
      }

      if (statudCode === 403) {
        let msg = '';
        if (error.response && error.response.data.result) {
          msg = t(`SERVICE_ERROR.${error.response.data.result}`);
        } else {
          msg = 'System Error';
        }
        if (isShowError) {
          toggleNotification({ key: msg }, error, () => {});
        }
        return;
      }

      if (statudCode === 422) {
        let msg = '';
        if (error.response) {
          if (error.response.data instanceof Blob) {
            msg = JSON.parse(await error.response.data.text()).result;
          } else {
            msg = t(`SERVICE_ERROR.${error.response.data.result}`);
          }
        }
        // console.log('isShowError', isShowError);
        if (isShowError) {
          toggleNotification(
            {
              key: msg,
            },
            error
          );
        }
        throw new Error(msg);
      }

      if (statudCode === 423) {
        let msg = '';
        if (error.response && error.response.data.result) {
          msg = t(`SERVICE_ERROR.${error.response.data.result}`);
        } else {
          msg = 'System Error';
        }
        if (isShowError) {
          toggleNotification({ key: msg }, error, () => {});
        }
        window.location.href = '/';
        return;
      }

      if (errorKey === 'System Error') {
        let msg = '';
        if (error.response && error.response.data.result) {
          msg = t(`SERVICE_ERROR.${error.response.data.result}`);
        }

        if (isShowError) {
          toggleNotification(
            {
              key: msg || 'System Error',
              data: { status_code: statudCode },
            },
            error
          );
        }
        // throw new Error(msg);
        throw new Error(JSON.stringify(errorObj));
      }

      throw new Error(JSON.stringify(errorObj));
    }
  };

  let cancelToken = React.useRef();

  React.useEffect(() => {
    return function cleanup() {
      if (cancelToken.current) {
        cancelToken.current.cancel();
      }
    };
  }, []);

  const exec = async (config = {}, isIgnoreGlobalSettingStore = false, isShowError) => {
    let responseData = defaultResponse;

    if (cancellable) {
      cancelToken.current = Axios.CancelToken.source();
    }

    setIsLoading(true);

    try {
      if (globalSettingStore && !isIgnoreGlobalSettingStore) {
        globalSettingStore.setSettingData((p) => ({ ...p, isLoading: true }));
      }

      const { data } = await axios({
        ...config,
        ...(cancellable ? { cancelToken: cancelToken.current.token } : {}),
      });
      responseData = data;
      setResponse(responseData);
    } catch (e) {
      setErrorStatus(e);
      if (!(e instanceof Axios.Cancel)) {
        console.log(e);
        // onError(e, isShowError);
      }
      // apiErrorHandle(e.response.status);
    } finally {
      setIsLoading(false);

      if (globalSettingStore && !isIgnoreGlobalSettingStore) {
        globalSettingStore.setSettingData((p) => ({ ...p, isLoading: false }));
      }
    }
    return responseData;
  };

  return {
    isLoading,
    response,
    exec,
    errorStatus,
    cancel: () => {
      if (cancelToken.current) {
        cancelToken.current.cancel();
        cancelToken.current = null;
      }
    },
  };
};

export default useAxios;
