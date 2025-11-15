# Graph Viewer Legend Update

Change the CSS rules in @docs/sims/graph-viewer/local.css so that the legend table 
first column has a 100px minimum and the second column has a 50px maximum 

Updated docs/sims/graph-viewer/local.css with 8 additions
       106      font-size: 16px;
       107    }
       108    
       109 +  .legend-table td:first-child {
       110 +    min-width: 100px;
       111 +  }
       112 +  
       113 +  .legend-table td:nth-child(2) {
       114 +    max-width: 50px;
       115 +  }
       116 +  
       117    .legend-table input[type="checkbox"] {
       118      margin-right: 5px;
       119    }
