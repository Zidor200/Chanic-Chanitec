import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { styled } from '@mui/material/styles';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { employees } from '../types/Employee';

const StyledNode = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  minWidth: 250,
  textAlign: 'center',
  margin: '8px',
}));

interface EmployeeNodeData {
  name: string;
  function: string;
  subType: string;
  contract: string;
  children?: EmployeeNodeData[];
  backgroundColor?: string;
}

// Organize employees into hierarchy based on departments
const organizeEmployees = () => {
  const head = employees.find(emp => emp.department === 'head');
  const domesticTeam = employees.filter(emp => emp.department === 'domestic');
  const polyvalentTeam = employees.filter(emp => emp.department === 'polyvalent');
  const centralTeam = employees.filter(emp => emp.department === 'central');

  // Create hierarchy
  const hierarchy: EmployeeNodeData = {
    name: head?.fullName || "Bilel AYACHI",
    function: "Department Froid et climatisation",
    subType: "DIRECTION",
    contract: "CDI",
    backgroundColor: '#ffb74d',
    children: [
      {
        name: "Chef de service Chargé de clim-domestique",
        function: "Service clim-domestique",
        subType: "",
        contract: "CDI",
        backgroundColor: '#fff176',
        children: domesticTeam.map(emp => ({
          name: emp.fullName,
          function: emp.function,
          subType: emp.subType,
          contract: emp.contract
        }))
      },
      {
        name: "Polyvalent",
        function: "Service Polyvalent",
        subType: "",
        contract: "CDI",
        backgroundColor: '#81c784',
        children: polyvalentTeam.map(emp => ({
          name: emp.fullName,
          function: emp.function,
          subType: emp.subType,
          contract: emp.contract
        }))
      },
      {
        name: "Chef de service adj chargé du climatisation centralisé",
        function: "Service climatisation centralisé",
        subType: "",
        contract: "CDI",
        backgroundColor: '#64b5f6',
        children: centralTeam.map(emp => ({
          name: emp.fullName,
          function: emp.function,
          subType: emp.subType,
          contract: emp.contract
        }))
      }
    ]
  };

  return hierarchy;
};

const renderNode = (node: EmployeeNodeData) => (
  <StyledNode sx={{ backgroundColor: node.backgroundColor || 'white' }}>
    <CardContent>
      <Typography variant="h6" component="div" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
        {node.name}
      </Typography>
      <Typography color="textSecondary" sx={{ fontSize: '0.9rem' }}>
        {node.function}
      </Typography>
      {node.subType && node.subType !== "AUCUN" && (
        <Chip
          label={node.subType}
          size="small"
          sx={{
            mt: 1,
            backgroundColor: node.contract === 'CDI' ? '#4caf50' : '#ff9800',
            color: 'white'
          }}
        />
      )}
    </CardContent>
  </StyledNode>
);

const renderTree = (node: EmployeeNodeData) => (
  <TreeNode label={renderNode(node)}>
    {node.children?.map((child, index) => (
      <React.Fragment key={index}>{renderTree(child)}</React.Fragment>
    ))}
  </TreeNode>
);

const OrgChart: React.FC = () => {
  const hierarchy = organizeEmployees();

  return (
    <Box sx={{ p: 4, overflowX: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Department Froid et climatisation
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Tree
          lineWidth="2px"
          lineColor="#bbb"
          lineBorderRadius="10px"
          label={renderNode(hierarchy)}
        >
          {hierarchy.children?.map((child, index) => (
            <React.Fragment key={index}>{renderTree(child)}</React.Fragment>
          ))}
        </Tree>
      </Box>
    </Box>
  );
};

export default OrgChart;