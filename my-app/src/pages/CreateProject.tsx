
import "../styles/CreateProject.css"; // Стили
import { SelectionPanel } from "../components/createProject/SelectionPanel"; // Импорт SelectionPanel

export function CreateProject() {
    return (
        <div className="content-wrapper-create">
            {/* Панель выбора (СЛЕВА) */}
            <SelectionPanel />
            <div className="main-content-create">
                
            </div>
        </div>
    );
}
