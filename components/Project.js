import planning from '../styles/Planning.module.css'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'
function Project(props) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: { name },
        end: (item, monitor) => {
          const dropResult = monitor.getDropResult()
          if (item && dropResult) {
            //snap into this one...
          }
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
          handlerId: monitor.getHandlerId(),
        }),
      }))
      const opacity = isDragging ? 0.4 : 1
    return (
<div  ref={drag} style={{opacity }} data-testid={`box`} className={planning.week}><div className={planning.weekTitle}>Project</div></div>
    );
}

export default Project;

