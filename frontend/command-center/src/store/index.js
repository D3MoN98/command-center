import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import media from "./media";
import permission from "./permission";
import role from "./role";
import user from "./user";

const store = configureStore({
  reducer: { auth, user, role, permission, media },
});

export default store;
