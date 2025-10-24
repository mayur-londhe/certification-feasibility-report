import { useEffect, useState } from "react";
import axios from "axios";
import SustainabilityLeaderboard from "../Leaderboard";

export default function App() {
  const query = new URLSearchParams(window.location.search);
  const [projectData, setProjectData] = useState([]);
  const [projectInfo, setProjectInfo] = useState([]);

  const HEADERS = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMTc5OWRiMTJlZTA0MDAyMzY0ZDJjOSIsImlhdCI6MTc1ODg3MTc0MywiZXhwIjoxNzYxNDYzNzQzfQ.DLpl9of9ilVmMLhBj2xyaBdXsMlwHgbnmoXUKB7hiUg`,
    },
  };
  const orgId = "60ab067ef9ce8c0023464181";
  const projectIds = query.get("projectIds")?.split(","); // "alpha"
  function rankProjectsByImpact(projects) {
    // Calculate totalImpact for each project
    const projectsWithImpact = projects.map(function (project) {
      const totalImpact =
        project.energy + project.water + project.waste + project.material;
      return { ...project, totalImpact };
    });

    // Sort descending by totalImpact
    const sortedProjects = projectsWithImpact.sort(function (a, b) {
      return b.totalImpact - a.totalImpact;
    });

    // Add rank
    return sortedProjects.map(function (project, index) {
      return {
        ...project,
        rank: index + 1,
        name: projectInfo?.find((p) => p?.id === project.id)?.name,
      };
    });
  }
  function roundIfGreaterThanHalf(num) {
    // return Math.floor(num);
    return Math.round(num);
    // const decimalPart = num - Math.floor(num);
    // if (decimalPart > 0.5) {
    //   return Math.ceil(num); // round up
    // } else {
    //   return Math.floor(num); // keep integer part
    // }
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      const projects = await Promise.all(
        projectIds.map(async (id) => {
          const { data } = await axios.get(
            `https://calculess-prod.sdplus.io/v1/metafire?projectId=${id}&feature=INSIGHTS&numberOfYears=1`,
            HEADERS
          );

          const projectAll = data?.data?.data?.interventions;

          const getValue = (name) =>
            projectAll?.categorized?.find((interv) => interv?.name === name)
              ?.quantities?.resource?.category?.value ?? 0;

          return {
            id: id,
            energy: roundIfGreaterThanHalf(getValue("Energy")),
            water: roundIfGreaterThanHalf(getValue("Water")),
            waste: roundIfGreaterThanHalf(getValue("Waste")),
            material: roundIfGreaterThanHalf(getValue("Materials")),
            capex: roundIfGreaterThanHalf(
              projectAll?.quantities?.overall?.finance?.capexConverted?.value
            ),
          };
        })
      );

      // Update state only once
      if (isMounted) setProjectData(projects);
    }
    fetchData();
    async function fetchProjectInfo() {
      const projectData = await axios.get(
        `https://calculess-prod.sdplus.io/v2/projects/${orgId}`,
        HEADERS
      );
      const prj = projectData?.data?.data?.body?.data?.projects.map(
        (project) => {
          return { id: project?._id, name: project?.name };
        }
      );
      setProjectInfo(prj);
    }
    fetchProjectInfo();

    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    return () => {
      isMounted = false; // cleanup
      clearInterval(interval); // clear interval on unmount
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: "20px",
      }}
    >
      <SustainabilityLeaderboard
        leaderboardData={rankProjectsByImpact(projectData)}
      />
    </div>
  );
}
