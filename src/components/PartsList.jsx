import React, {Fragment} from "react";
import { observer } from "mobx-react";
import Part from './Part';
import {PartsListProvider, usePartList, withPartList} from "../models/PartsListModel";
import {Image, Layer, Rect, Stage, Text} from "react-konva";
import useImage from "use-image";

const Par = observer(({p}) => {
  const [image] = useImage(p.img)

  return <Image image={image} />
})

const Parts = observer(() => {
  const pt = usePartList()

  return <Fragment>
    {pt.parts.map(p => <Par p={p}/>)}
  </Fragment>
})

@withPartList
@observer
class PartsList extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.store.addProbe()}>add probe</button>
        <div>blueprint: <pre>{this.props.store.bluePrint}</pre></div>
        <br/>
        <div>
          Parts: {
            this.props.store.parts.map((p) => {
              return <Part key={p.id} part={p} />;
            })
          }
        </div>
        <Stage width={window.innerWidth} height={window.innerHeight}>
        <PartsListProvider partListStore={this.props.store}>
          <Layer>
            <Parts />
          </Layer>
        </PartsListProvider>
        </Stage>
      </div>
    );
  }
}
export default PartsList;
