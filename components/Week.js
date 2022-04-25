import planning from '../styles/Planning.module.css'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'
function Week(props) {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.BOX,
        drop: () => ({ name: 'Dustbin' }),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
      }))
      const isActive = canDrop && isOver
      let backgroundColor = '#fff'
      if (isActive) {
        backgroundColor = 'darkgreen'
      } else if (canDrop) {
        backgroundColor = 'darkkhaki'
      }
    return (
<div className={planning.week} ref={drop} style={{backgroundColor}} data-testid="dustbin"><div className={planning.weekTitle}>{props.name}</div>{isActive ? "Release to drop" : "Drag a box here"}</div>
    );
}

export default Week;

