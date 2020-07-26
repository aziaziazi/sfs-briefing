import React from "react";
import { observer } from "mobx-react";
import Part from './Part';
import {withPartList} from "../models/PartsListModel";

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
      </div>
    );
  }
}
export default PartsList;
