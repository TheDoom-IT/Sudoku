import '../styles/Cell.css'

export interface CellProprs {
    onClick: () => void
    active: boolean
}
export function Cell(props: CellProprs) {

    return <div className={"Cell " + (props.active ? "active" : "")} onClick={props.onClick}></div>
}