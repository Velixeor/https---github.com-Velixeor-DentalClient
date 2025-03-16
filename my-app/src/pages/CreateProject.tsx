
import "../styles/CreateProject.css";
import { TeethSelector } from "../components/createProject/TeethSelector";
import { SidebarCreatePr } from "../components/createProject/SidebarCreatePr";
import { TeethListWithSelection } from "../components/createProject/TeethListWithSelection"; // Импорт нового компонента

export function CreateProject() {

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
