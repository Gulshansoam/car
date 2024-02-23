import { Suspense, lazy } from "react";
// components
import LoadingScreen from "../components/loading-screen";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

export const LoginPage = Loadable(lazy(() => import("../pages/LoginPage")));

export const Dashboard = Loadable(
  lazy(() => import("../pages/dashboard/index"))
);
export const Competitors = Loadable(
  lazy(() => import("../pages/competitors/index"))
);
export const CompanyProfile = Loadable(
  lazy(() => import("../pages/companyprofile/index"))
);
export const Comparison = Loadable(
  lazy(() => import("../pages/comparison/index"))
);
export const TenderResult = Loadable(
  lazy(() => import("../pages/tenderResult/index"))
);

// export const PageFour = Loadable(lazy(() => import("../pages/PageFour")));
// export const PageFive = Loadable(lazy(() => import("../pages/PageFive")));
// export const PageSix = Loadable(lazy(() => import("../pages/PageSix")));

export const Page404 = Loadable(lazy(() => import("../pages/Page404")));

// export const Profile = Loadable(lazy(() => import("../pages/Profile")));
