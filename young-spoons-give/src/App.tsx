import { GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import { Authenticated } from "@refinedev/core";

import { authProvider, dataProvider, liveProvider } from "./providers";
import { Home, ForgotPassword, Login, Register } from "./pages";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp, Layout } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              liveProvider={liveProvider}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "eS77V8-T9QTum-50HzW4",
                liveMode: "auto",
              }}
            >
              <Routes>
                {/* Public Routes */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Protected Routes */}
                <Route
                  element={
                    <Authenticated
                    key="authenticated-layout"
                    v3LegacyAuthProviderCompatible
                    fallback={<CatchAllNavigate to="/login" />}
                >
                    <Layout>
                        <Outlet />
                    </Layout>
                </Authenticated>
                  }
                >
                  {/* "/" is now the protected home page */}
                  <Route index element={<Home />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;