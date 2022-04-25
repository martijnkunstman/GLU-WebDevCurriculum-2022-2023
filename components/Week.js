import planning from '../styles/Planning.module.css'
function Week(props) {
    return (
<div className={planning.week}><div className={planning.weekTitle}>{props.number}</div></div>
    );
}

export default Week;

