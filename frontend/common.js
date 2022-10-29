import jwtDecode from "jwt-decode";
import { createInstance } from "@datapunt/matomo-tracker-react";
import PATH from "@/utils/path";
import env from "@/utils/env";
import moment from "moment";

export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const getParameterByName = (name, url) => {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");

  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, ""));
};

export const invertKeyValues = (obj) =>
  Object.keys(obj).reduce((acc, key) => {
    acc[obj[key]] = key;
    return acc;
  }, {});

export const storeTempUserInfo = (data) => {
  try {
    sessionStorage.setItem("name", data.name);
    sessionStorage.setItem("email", data.email);
    sessionStorage.setItem("roleId", data.roleId);
    sessionStorage.setItem("id", data.id);
    sessionStorage.setItem("employeeId", data.employeeId);
    sessionStorage.setItem("theme", data.theme);
    sessionStorage.setItem("region", data.region);
    sessionStorage.setItem("iat", data.iat);
    sessionStorage.setItem("businessType", data.businessType);
    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const storeUserInfo = (jwtToken) => {
  try {
    const data = jwtDecode(jwtToken);
    sessionStorage.setItem("accessToken", jwtToken);
    sessionStorage.setItem("name", data.name);
    sessionStorage.setItem("email", data.email);
    sessionStorage.setItem("roleId", data.roleId);
    sessionStorage.setItem("id", data.id);
    sessionStorage.setItem("employeeId", data.employeeId);
    sessionStorage.setItem("theme", data.theme);
    sessionStorage.setItem("region", data.region);
    sessionStorage.setItem("iat", data.iat);
    sessionStorage.setItem("businessType", data.businessType);
    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getstoreUserInfo = () => {
  localStorage.removeItem("logout");
  const userInfo = {
    accessToken: sessionStorage.getItem("accessToken"),
    name: sessionStorage.getItem("name"),
    email: sessionStorage.getItem("email"),
    roleId: sessionStorage.getItem("roleId"),
    id: sessionStorage.getItem("id"),
    employeeId: sessionStorage.getItem("employeeId"),
    theme: sessionStorage.getItem("theme"),
    region: sessionStorage.getItem("region"),
    iat: sessionStorage.getItem("iat"),
    businessType: sessionStorage.getItem("businessType"),
  };
  return userInfo;
};

export const saveRedirectUrl = (value) => {
  document.cookie = `ev_redirect_url=${value}`;
};

export const getRedirectUrl = () => {
  let result;
  const cookieArr = document.cookie.split(";");
  cookieArr.forEach((item) => {
    if (item.includes("ev_redirect_url=")) {
      result = item.replace("ev_redirect_url=", "").trim();
    }
  });
  return result;
};

export const saveCollapsed = (value) => {
  sessionStorage.setItem("Collapsed", value);
};

export const getCollapsed = () => {
  return sessionStorage.getItem("Collapsed") === "true";
};

export const cookieSync = () => {
  // 處理Cookie，並存入sessionStorage
  let result;
  const cookieArr = document.cookie.split(";");
  cookieArr.forEach((item) => {
    if (item.includes("authorization=")) {
      result = item.replace("authorization=", "").trim();
    }
  });
  document.cookie = `authorization=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  // Decode JWT
  const userData = storeUserInfo(result);
  return userData;
};

export const logout = () => {
  localStorage.setItem("logout", "logout");
  sessionStorage.clear();
  localStorage.removeItem("nowUrl");
  document.cookie = `authorization=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  window.location.href = "/";
  // window.location.href = "https://login.microsoftonline.com/wistron.com/oauth2/logout";
};

export const clearSession = () => {
  localStorage.setItem("logout", "logout");
  sessionStorage.clear();
  localStorage.removeItem("nowUrl");
  document.cookie = `authorization=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const logoutAAD = () => {
  const redirectUrl = env.PROJECTION_URL;
  localStorage.removeItem("isEverLogin");
  window.location.href = `https://login.microsoftonline.com/wistron.com/oauth2/logout?post_logout_redirect_uri=${encodeURIComponent(
    redirectUrl
  )}`;
};

export const storageEvent = (e) => {
  switch (e.key) {
    case "logout":
      // do logout
      logout();
      window.removeEventListener("storage", storageEvent);
      localStorage.removeItem("logout");
      localStorage.removeItem("getSessionStorage");
      break;
    case "getSessionStorage": {
      // send data to another page
      if (sessionStorage.getItem("accessToken")) {
        const text = JSON.stringify(sessionStorage.getItem("accessToken"));
        localStorage.setItem("sessionStorage", text);
      }
      // localStorage.sessionStorage = text;
      break;
    }
    case "sessionStorage": {
      if (e.newValue) {
        const data = JSON.parse(e.newValue);
        storeUserInfo(data);
        localStorage.removeItem("sessionStorage");
      }
      break;
    }
    default:
  }
};

export const pageSyncLogout = () => {
  console.log("401");
  window.removeEventListener("storage", storageEvent);
  localStorage.setItem("logout", "logout");
  const url = document.location.href;
  const matchIdx = url.indexOf("#");
  const keepUrl = url.slice(matchIdx + 1);
  localStorage.setItem("keepUrl", keepUrl);
  sessionStorage.clear();
  localStorage.removeItem("nowUrl");
  window.location.href = "/";
};

export const pageSync = (nowUrl) =>
  new Promise((rs, rj) => {
    window.addEventListener("storage", storageEvent);
    localStorage.getSessionStorage = new Date();
    setTimeout(() => {
      // console.log('Lester PageSync', sessionStorage.getItem("accessToken"));
      // console.log('Lester Href', window.location.href);
      if (!sessionStorage.getItem("accessToken")) {
        localStorage.nowUrl = nowUrl;
        pageSyncLogout();
        rj();
      } else {
        // console.log('Lester Has accessToken', window.location.href, getRedirectUrl());
        if (window.location.href === getRedirectUrl()) {
          saveRedirectUrl("");
        }
        rs();
      }
    }, 500);
  });

/**
 * 將 route PATH 中 :variabe 取代
 *
 * @param {string} path Route path
 * @param {string || string} args 要取代的數值/字串
 * resolvePath('/user/:id', 2) => '/user/2'
 */
export const resolvePath = (path, ...args) => {
  let replacedArgNum = 0;
  const pathArray = path.split("/").map((p) => {
    if (p.charAt(0) === ":") {
      const replacedArg = encodeURIComponent(args[replacedArgNum]);
      replacedArgNum += 1;
      return replacedArg;
    }
    return p;
  });
  return pathArray.join("/");
};

export const gotoPath = (history, type, ...args) => {
  let url = PATH[type];
  if (args) {
    url = resolvePath(url, ...args);
  }
  history.push(url);
};

export const initializeMatomo = (cookie) => {
  const cookieArr = cookie.split(";").map((str) => str.trim().split("="));

  const cookieObj = {};
  cookieArr.forEach((item) => {
    const [key, val] = item;
    cookieObj[key] = val;
  });

  if (cookieObj.authorization) {
    // console.log("MATOMO_URL", process.env.MATOMO_URL);
    // console.log("MATOMO_SITEID", process.env.MATOMO_SITEID);
    const decoded = jwtDecode(cookieObj.authorization);
    return createInstance({
      urlBase: process.env.MATOMO_URL,
      siteId: process.env.MATOMO_SITEID,
      userId: decoded.emplId,
    });
  }

  return null;
};

export const getFakeArray = (length) =>
  Array.from({ length }, (i, k) => ({
    id: `id_${k}`,
    content: `item_${k}`,
  }));

export const localeCompareSort = (a, b, key) => {
  if (a && b && a[key] && b[key]) {
    return a[key].localeCompare(b[key], undefined, {
      numeric: true,
      sensitivity: "base",
    });
  }
  return 1;
};

const chageModalScrollStatus = [];
export const chageModalScroll = (status) => {
  if (status) {
    chageModalScrollStatus.push(status);
  } else {
    chageModalScrollStatus.pop();
  }

  if (chageModalScrollStatus.length > 0) {
    document.querySelector(".ant-modal-body").style.overflowY = "hidden";
  } else {
    document.querySelector(".ant-modal-body").style.overflowY = "auto";
  }
};

export const timeStamp2Date = (timeStamp) => {
  if (!timeStamp || timeStamp === 0) return "Not Updated";
  return moment(timeStamp).format("YYYY/MM/DD hh:mm");
};

// Merge array cells
export const mergeTableData = (data, firstColumn, secondColumn) =>
  data
    .reduce((result, item) => {
      // RF 需要Merge的table column有兩項，Key: firstColumn;secondColumn
      const mergeKey = `${item[firstColumn]};${item[secondColumn]}`;
      if (result.indexOf(mergeKey) < 0) {
        result.push(mergeKey);
      }
      return result;
    }, [])
    .reduce((result, name) => {
      // name: firstColumn;secondColumn
      const ckeckValue = name.split(";");
      // 處理 First Column Merge : firstColumn 需要對上
      const rowSpanName = `${firstColumn}RowSpan`;
      const mergeFirst = result.filter(
        (item) => item[firstColumn] === ckeckValue[0]
      );
      mergeFirst.forEach((item, index) => {
        if (index === 0) item[rowSpanName] = mergeFirst.length;
        else item[rowSpanName] = 0;
      });

      // 處理 Second Column Merge : Key需要全對上
      const rowSpanName2 = `${secondColumn}RowSpan`;
      const mergeSecond = result.filter(
        (item) =>
          item[firstColumn] === ckeckValue[0] && item[secondColumn] === ckeckValue[1]
      );
      mergeSecond.forEach((item, index) => {
        if (index === 0) item[rowSpanName2] = mergeSecond.length;
        else item[rowSpanName2] = 0;
      });

      return result;
    }, data);

export const formatDate = (value, fmt) => {
  // 符合格式才進行轉換
  const isDateFormat = moment(value, moment.ISO_8601, true).isValid();
  return isDateFormat ? moment(value).format(fmt) : value;
};

// 底線轉駝峰
export const toHump = (val) => {
  return val.replace(/\_(\w)/g, (_, letter) => {
    return letter.toUpperCase();
  });
};

// 駝峰轉底線
export const toLine = (val) => {
  return val.replace(/([A-Z])/g, "_$1").toLowerCase();
};

export const isPrd = (func) => {
  if (process.env.EV_ENV === "production") {
    func();
  }
};
