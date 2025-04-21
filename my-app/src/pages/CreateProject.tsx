import "../styles/CreateProject.css";
import {  useEffect, useRef } from "react";
import { TeethSelector } from "../components/createProject/TeethSelector";
import { SidebarCreatePr } from "../components/createProject/SidebarCreatePr";
import { TeethListWithSelection } from "../components/createProject/TeethListWithSelection";
import { useSearchParams } from "react-router-dom";  
import useFetchTeethData from "../hooks/useFetchTeethData";
import { useTeethContext } from "../context/TeethContext";
export function CreateProject() {
    const [searchParams] = useSearchParams();
    const { dispatch } = useTeethContext();
    const hasClearedRef = useRef(false);
  
    const projectIdParam = searchParams.get("id");
    const isDraftMode = searchParams.get("mode") === "draft";
    const projectId = projectIdParam ? Number(projectIdParam) : null;
  
    useEffect(() => {
      if (isDraftMode && !hasClearedRef.current) {
        dispatch({ type: "CLEAR_ALL" });
        hasClearedRef.current = true;  // больше не чистим, даже если URL не меняется
      }
    }, [isDraftMode, dispatch]);
  
    // Загрузка существующего проекта
    if (projectId && !isNaN(projectId)) {
      const { loading, error } = useFetchTeethData(projectId);
      if (error) return <p>Ошибка: {error}</p>;
    }
   
    return (
        <div className="content-wrapper-create">
            <SidebarCreatePr />
            <div className="main-content-create">
                <TeethSelector />
            </div>
            <TeethListWithSelection />
        </div>
    );
}
