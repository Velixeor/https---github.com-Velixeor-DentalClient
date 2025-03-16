import React from "react";
import { CommentsSection } from "./CommentsSection";
import { SelectionPanel } from "./SelectionPanel";

export function SidebarCreatePr(){
    return (
        <div className="sidebar-create-pr">
            <SelectionPanel />
            <CommentsSection />
        </div>
    );
};
