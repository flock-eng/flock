// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_middleware from "./routes/_middleware.ts";
import * as $api_joke from "./routes/api/joke.ts";
import * as $bookmarks from "./routes/bookmarks.tsx";
import * as $callback from "./routes/callback.ts";
import * as $connections from "./routes/connections.tsx";
import * as $greet_name_ from "./routes/greet/[name].tsx";
import * as $groups from "./routes/groups.tsx";
import * as $index from "./routes/index.tsx";
import * as $login from "./routes/login.ts";
import * as $logout from "./routes/logout.ts";
import * as $messages from "./routes/messages.tsx";
import * as $notifications from "./routes/notifications.tsx";
import * as $profile from "./routes/profile.tsx";
import * as $settings from "./routes/settings.tsx";
import * as $your_additional_page from "./routes/your-additional-page.tsx";
import * as $your_page from "./routes/your-page.tsx";
import * as $Counter from "./islands/Counter.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_middleware.ts": $_middleware,
    "./routes/api/joke.ts": $api_joke,
    "./routes/bookmarks.tsx": $bookmarks,
    "./routes/callback.ts": $callback,
    "./routes/connections.tsx": $connections,
    "./routes/greet/[name].tsx": $greet_name_,
    "./routes/groups.tsx": $groups,
    "./routes/index.tsx": $index,
    "./routes/login.ts": $login,
    "./routes/logout.ts": $logout,
    "./routes/messages.tsx": $messages,
    "./routes/notifications.tsx": $notifications,
    "./routes/profile.tsx": $profile,
    "./routes/settings.tsx": $settings,
    "./routes/your-additional-page.tsx": $your_additional_page,
    "./routes/your-page.tsx": $your_page,
  },
  islands: {
    "./islands/Counter.tsx": $Counter,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
