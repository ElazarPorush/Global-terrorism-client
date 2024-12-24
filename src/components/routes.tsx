import { createBrowserRouter } from "react-router-dom";
import AttacksTypes from "./pages/attacks/AttacksTypes";
import Map from "./pages/regions/Map";
import Home from "./pages/Home";
import TopGroups from "./pages/regions/TopGroups";
import AttackTypesByYear from "./pages/years/AttackTypesByYear";
import OrganizationsByYear from "./pages/years/OrganizationsByYear";
import HighestCityOfOrganization from "./pages/regions/HighestCityOfOrganization";
import Add from "./pages/crud/Add";

export const pages = [
    {
        path: '',
        element: <Home />
    },
    {
        path: 'AttacksTypes',
        element: <AttacksTypes /> ,
        display: 'Deadliest attacks types',
    },
    {
        path: 'MapCities',
        element: <Map />,
        display: 'Highest casualty cities',
    },
    {
        path: 'attackTypesByYear',
        element: <AttackTypesByYear /> ,
        display: 'Attacks Types By Year',
    },
    {
        path: 'TopGroups',
        element: <TopGroups />,
        display: 'Top groups in region',
    },
    {
        path: 'organizationsByYear',
        element: <OrganizationsByYear />,
        display: 'Organizations By Year',
    },
    {
        path: 'highestCityOfOrganization',
        element: <HighestCityOfOrganization />,
        display: 'Highest City Of Organization',
    },
    {
        path: 'add',
        element: <Add />,
    }
];

export const routes = createBrowserRouter(pages);
