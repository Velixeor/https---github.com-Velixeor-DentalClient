export interface Project {
    id: number;
    customer: string;
    patient: string;
    dateCreate: string;
    status: string;
    dateCompleted?: string | null;
}
