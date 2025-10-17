import React, { useCallback, useRef } from 'react';
import ReactFlow, { ReactFlowProvider, Background, Controls, useNodesState, useEdgesState, addEdge, type OnConnect, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import { Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { nodesChanged, edgesChanged, edgeConnected, addNode } from '../features/workflow/workflowSlice';

import NodesPanel from '../components/workflow/NodesPanel';
import StartNode from '../components/workflow/customNodes/StartNode';
import ApprovalNode from '../components/workflow/customNodes/ApprovalNode';

// กำหนดประเภทของ Custom Node ที่เราสร้างขึ้น
const nodeTypes = {
  start: StartNode,
  approval: ApprovalNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

function WorkflowCanvas() {
  const dispatch = useDispatch<AppDispatch>();
  const { nodes, edges } = useSelector((state: RootState) => state.workflow.currentWorkflow);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { project } = useReactFlow();

  const onNodesChange = useCallback((changes) => dispatch(nodesChanged(changes)), [dispatch]);
  const onEdgesChange = useCallback((changes) => dispatch(edgesChanged(changes)), [dispatch]);
  const onConnect: OnConnect = useCallback((params) => dispatch(edgeConnected(params)), [dispatch]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      
      if (reactFlowWrapper.current) {
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow-type');
        const name = event.dataTransfer.getData('application/reactflow-name');

        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const newNode = {
          id: getId(),
          type,
          position,
          data: { label: name },
        };
        
        dispatch(addNode(newNode));
      }
    },
    [project, dispatch]
  );

  return (
    <Box sx={{ height: '80vh', flexGrow: 1 }} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  );
}

export default function WorkflowEditorPage() {
  // useEffect to fetch workflow data by ID would go here
  return (
    <ReactFlowProvider>
      <Grid container spacing={2} sx={{ height: 'calc(100vh - 64px)' }}>
        <Grid item xs={2}>
          <NodesPanel />
        </Grid>
        <Grid item xs={10}>
          <WorkflowCanvas />
        </Grid>
      </Grid>
    </ReactFlowProvider>
  );
}