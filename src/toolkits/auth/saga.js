import { call, put, all, takeEvery } from "redux-saga/effects";
import authSlice from "./slice";

import { login } from "../../apis/user.api";

import {
  clearCookieToken,
  getCookieToken,
  insertCookieToken,
} from "../../utils/cookie";

import { jwtDecode } from "jwt-decode";
import { TOKEN_VERIFY } from "../../utils/common";

function* _checkAuthentication() {
  try {
    const user = getCookieToken(TOKEN_VERIFY);
    if (user) {
      yield put(authSlice.actions.loginSuccess(user));
    } else {
      window.location.pathname = "./login";
    }
  } catch (error) {
    yield put(
      authSlice.actions.loginError({ error: "Đăng nhập lại hệ thống!" })
    );
    window.location.pathname = "./login";
  }
}

function* _login({ payload }) {
  try {
    let data, status;
    ({ data, status } = yield call(login, payload));

    if (status === 200 || status === 201) {
      const user = jwtDecode(data?.data);

      yield put(authSlice.actions.loginSuccess(user));
      insertCookieToken(
        TOKEN_VERIFY,
        {
          ...user,
          token: data?.data,
        },
        user?.exp
      );
      window.location.pathname = "./";
    }
  } catch (error) {
    console.log(error);
    yield put(
      authSlice.actions.loginError({
        error: "Tài khoản hoặc mật khẩu không chính xác!",
      })
    );
  }
}

function* _logout() {
  try {
    yield clearCookieToken(TOKEN_VERIFY);
    yield put(authSlice.actions.checkAuthentication());
  } catch (error) {
    console.log(error);
  } finally {
    // yield call(logout);
  }
}

// function* _getSessionUser() {
//   try {
//     const user = getCookieToken(TOKEN_VERIFY);
//     if (user) {
//       yield put(authSlice.actions.getSessionUserSucces(user));
//     }
//   } catch (error) {
//     yield put(authSlice.actions.getSessionUserError());
//     yield put(authSlice.actions.checkAuthentication());
//   }
// }

export default function* saga() {
  yield all([
    yield takeEvery(
      authSlice.actions.checkAuthentication().type,
      _checkAuthentication
    ),
    yield takeEvery(authSlice.actions.login().type, _login),
    yield takeEvery(authSlice.actions.logout().type, _logout),
    // yield takeEvery(authSlice.actions.getSessionUser.type, _getSessionUser),
  ]);
}
