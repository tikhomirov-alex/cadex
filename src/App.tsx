import { Flex } from "antd";
import { SidePanel } from "./components/ui/SidePanel/SidePanel";
import { AddPrimitiveDialog } from "./components/ui/AddPrimitiveDialog/AddPrimitiveDialog";
import useThreeScene from "./hooks/useThreeScene";
import { useMaterialManager } from "./hooks/useMaterialManager";
import { useGroup } from "./hooks/useGroup";
import { useDispatch, useSelector } from "react-redux";
import { clearSceneState } from "./store/primitiveSlice";
import type { RootState } from "./store";
import { useState } from "react";
import './App.scss';

function App() {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const { addObject, clearScene, cameraRef } = useThreeScene();
  const { materialReferences, highlightObject, updateColor } = useMaterialManager();
  const dispatch = useDispatch();

  const boxCount = useSelector((state: RootState) => state.primitives.boxCount);
  const pyramidCount = useSelector(
    (state: RootState) => state.primitives.pyramidCount
  );

  const addGroup = useGroup(
    addObject,
    cameraRef,
    materialReferences,
    dispatch,
    boxCount,
    pyramidCount,
    () => setShowDialog(false)
  );

  const onClear = () => {
    clearScene();
    dispatch(clearSceneState());
    materialReferences.clear();
  };

  return (
    <Flex>
      <SidePanel
        onAdd={() => setShowDialog(true)}
        onClear={onClear}
        updateColor={updateColor}
        highlightObject={highlightObject}
      />
      <div id="scene" />
      <AddPrimitiveDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onAddGroup={addGroup}
      />
    </Flex>
  );
}

export default App;
