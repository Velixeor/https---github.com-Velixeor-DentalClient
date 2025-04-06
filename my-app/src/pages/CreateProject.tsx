import "../styles/CreateProject.css";
import {  useEffect } from "react";
import { TeethSelector } from "../components/createProject/TeethSelector";
import { SidebarCreatePr } from "../components/createProject/SidebarCreatePr";
import { TeethListWithSelection } from "../components/createProject/TeethListWithSelection";
import { useSearchParams } from "react-router-dom";  
import useFetchTeethData from "../hooks/useFetchTeethData";
import { useTeethContext } from "../context/TeethContext";
export function CreateProject() {
    const [searchParams] = useSearchParams();
    const { dispatch } = useTeethContext();
    const projectIdParam = searchParams.get("id");
    const projectId = projectIdParam ? Number(projectIdParam) : null;
    useEffect(() => {
         dispatch({ type: "CLEAR_ALL" });  // Очистить контекст, только если projectId существует
    }, [dispatch]);
    
    if (!projectId || isNaN(projectId)) {
       
    }else{
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
