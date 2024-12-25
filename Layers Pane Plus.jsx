/* Version 2.0

 Layers Pane Plus by Dony

 Author: dony.

 This script provides advanced functionality for creating and managing layers in Adobe After Effects.
 It includes features for creating various layer types, deleting layers, sequencing layers, splitting layers at the current time indicator, precomposing layers, and creating new compositions.

 Features:
 - Create layers: Text, Solid, Null Object, Shape, Camera, Light, Adjustment
 - Delete selected layers
 - Create layer sequences based on selection order
 - Split layers at the current time indicator (Shortcut: Ctrl+Shift+D)
 - Precompose selected layers (Shortcut: Ctrl+Alt+C)
 - Create new composition
 - User-friendly interface with icon buttons
 - Dockable panel in the workspace
 - Resizable window with responsive button alignment
 - Auto Parent Layers (Only for Text, Shape and Null layers)
 - Match Layer Duration (Only for Text, Shape and Null layers)
 - Auto Delete Split Parts option
 - Show Delete Confirmation option
 - Settings panel for customizing script behavior
 - Help documentation with feature guide

*/

// Function to create a text layer
function createTextLayer() {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) {
        alert("No active composition. Please create a composition first.");
        return;
    }

    app.beginUndoGroup("Create Text Layer");

    var selectedLayers = comp.selectedLayers;
    var autoParentLayers = app.settings.haveSetting("LayersPanePlus", "autoParentLayers") ? 
                           app.settings.getSetting("LayersPanePlus", "autoParentLayers") === "true" : 
                           false;
    var matchDuration = app.settings.haveSetting("LayersPanePlus", "matchNewLayerDuration") ? 
                       app.settings.getSetting("LayersPanePlus", "matchNewLayerDuration") === "true" : 
                       false;

    // Case 1: Only Parent Nulls active
    if (autoParentLayers && !matchDuration && selectedLayers.length > 0) {
        for (var i = selectedLayers.length - 1; i >= 0; i--) {
            var selectedLayer = selectedLayers[i];
            var newText = comp.layers.addText();
            
            newText.moveBefore(selectedLayer);
            newText.position.setValue(selectedLayer.position.value);

            if (selectedLayer.parent == null) {
                selectedLayer.setParentWithJump(newText);
            } else {
                var currentParent = selectedLayer.parent;
                newText.setParentWithJump(currentParent);
                selectedLayer.setParentWithJump(newText);
            }

            var currentPosition = selectedLayer.position.value;
            selectedLayer.position.setValue([0, 0].concat(currentPosition.length > 2 ? [currentPosition[2]] : []));
        }
    }
    // Case 2: Only Match Duration active
    else if (!autoParentLayers && matchDuration && selectedLayers.length > 0) {
        var selectedLayer = selectedLayers[0];
        var newText = comp.layers.addText();
        
        newText.moveBefore(selectedLayer);
        
        var duration = selectedLayer.outPoint - selectedLayer.inPoint;
        newText.inPoint = selectedLayer.inPoint;
        newText.outPoint = newText.inPoint + duration;
    }
    // Case 3: Both active
    else if (autoParentLayers && matchDuration && selectedLayers.length > 0) {
        for (var i = selectedLayers.length - 1; i >= 0; i--) {
            var selectedLayer = selectedLayers[i];
            var newText = comp.layers.addText();
            
            newText.moveBefore(selectedLayer);
            newText.position.setValue(selectedLayer.position.value);

            if (selectedLayer.parent == null) {
                selectedLayer.setParentWithJump(newText);
            } else {
                var currentParent = selectedLayer.parent;
                newText.setParentWithJump(currentParent);
                selectedLayer.setParentWithJump(newText);
            }

            var currentPosition = selectedLayer.position.value;
            selectedLayer.position.setValue([0, 0].concat(currentPosition.length > 2 ? [currentPosition[2]] : []));

            newText.inPoint = selectedLayer.inPoint;
            newText.outPoint = selectedLayer.outPoint;
        }
    }
    // Case 4: None active
    else {
        app.executeCommand(2836); // ID for "New Text Layer"
    }

    app.endUndoGroup();
}

// Function to create a solid layer
function createSolidLayer() {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) {
        alert("No active composition. Please create a composition first.");
        return;
    }

    app.beginUndoGroup("Create Solid Layer");
    app.executeCommand(2038); // ID for "Solid..."
    app.endUndoGroup();
}

// Function to create a light
function createLight() {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) {
        alert("No active composition. Please create a composition first.");
        return;
    }

    app.beginUndoGroup("Create Light");
    app.executeCommand(2563); // ID for "New Light"
    app.endUndoGroup();
}

// Function to create a camera
function createCamera() {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) {
        alert("No active composition. Please create a composition first.");
        return;
    }

    app.beginUndoGroup("Create Camera");
    app.executeCommand(2564); // ID for "New Camera"
    app.endUndoGroup();
}

// Function to create null objects
function createNullObject() {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) {
        alert("No active composition. Please create a composition first.");
        return;
    }

    app.beginUndoGroup("Create Null Object");

    var selectedLayers = comp.selectedLayers;
    var autoParentLayers = app.settings.haveSetting("LayersPanePlus", "autoParentLayers") ? 
                           app.settings.getSetting("LayersPanePlus", "autoParentLayers") === "true" : 
                           false;
    var matchDuration = app.settings.haveSetting("LayersPanePlus", "matchNewLayerDuration") ? 
                       app.settings.getSetting("LayersPanePlus", "matchNewLayerDuration") === "true" : 
                       false;

    // Case 1: Only Parent Nulls active
    if (autoParentLayers && !matchDuration && selectedLayers.length > 0) {
        for (var i = selectedLayers.length - 1; i >= 0; i--) {
            var selectedLayer = selectedLayers[i];
            var newNull = comp.layers.addNull();
            
            newNull.moveBefore(selectedLayer);
            newNull.position.setValue(selectedLayer.position.value);

            if (selectedLayer.parent == null) {
                selectedLayer.setParentWithJump(newNull);
            } else {
                var currentParent = selectedLayer.parent;
                newNull.setParentWithJump(currentParent);
                selectedLayer.setParentWithJump(newNull);
            }

            var currentPosition = selectedLayer.position.value;
            selectedLayer.position.setValue([0, 0].concat(currentPosition.length > 2 ? [currentPosition[2]] : []));
        }
    }
    // Case 2: Only Match Duration active
    else if (!autoParentLayers && matchDuration && selectedLayers.length > 0) {
        var selectedLayer = selectedLayers[0];
        var newNull = comp.layers.addNull();
        
        // Move null above selected layer
        newNull.moveBefore(selectedLayer);
        
        var duration = selectedLayer.outPoint - selectedLayer.inPoint;
        newNull.inPoint = selectedLayer.inPoint;
        newNull.outPoint = newNull.inPoint + duration;
    }
    // Case 3: Both active
    else if (autoParentLayers && matchDuration && selectedLayers.length > 0) {
        for (var i = selectedLayers.length - 1; i >= 0; i--) {
            var selectedLayer = selectedLayers[i];
            var newNull = comp.layers.addNull();
            
            newNull.moveBefore(selectedLayer);
            newNull.position.setValue(selectedLayer.position.value);

            if (selectedLayer.parent == null) {
                selectedLayer.setParentWithJump(newNull);
            } else {
                var currentParent = selectedLayer.parent;
                newNull.setParentWithJump(currentParent);
                selectedLayer.setParentWithJump(newNull);
            }

            var currentPosition = selectedLayer.position.value;
            selectedLayer.position.setValue([0, 0].concat(currentPosition.length > 2 ? [currentPosition[2]] : []));

            newNull.inPoint = selectedLayer.inPoint;
            newNull.outPoint = selectedLayer.outPoint;
        }
    }
    // Case 4: None active
    else {
        app.executeCommand(2767); // ID for "New Null Object"
    }

    app.endUndoGroup();
}

// Function to create a shape layer
function createShapeLayer() {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) {
        alert("No active composition. Please create a composition first.");
        return;
    }

    app.beginUndoGroup("Create Shape Layer");

    var selectedLayers = comp.selectedLayers;
    var autoParentLayers = app.settings.haveSetting("LayersPanePlus", "autoParentLayers") ? 
                           app.settings.getSetting("LayersPanePlus", "autoParentLayers") === "true" : 
                           false;
    var matchDuration = app.settings.haveSetting("LayersPanePlus", "matchNewLayerDuration") ? 
                       app.settings.getSetting("LayersPanePlus", "matchNewLayerDuration") === "true" : 
                       false;

    // Case 1: Only Parent Nulls active
    if (autoParentLayers && !matchDuration && selectedLayers.length > 0) {
        for (var i = selectedLayers.length - 1; i >= 0; i--) {
            var selectedLayer = selectedLayers[i];
            var newShape = comp.layers.addShape();
            
            newShape.moveBefore(selectedLayer);
            newShape.position.setValue(selectedLayer.position.value);

            if (selectedLayer.parent == null) {
                selectedLayer.setParentWithJump(newShape);
            } else {
                var currentParent = selectedLayer.parent;
                newShape.setParentWithJump(currentParent);
                selectedLayer.setParentWithJump(newShape);
            }

            var currentPosition = selectedLayer.position.value;
            selectedLayer.position.setValue([0, 0].concat(currentPosition.length > 2 ? [currentPosition[2]] : []));
        }
    }
    // Case 2: Only Match Duration active
    else if (!autoParentLayers && matchDuration && selectedLayers.length > 0) {
        var selectedLayer = selectedLayers[0];
        var newShape = comp.layers.addShape();
        
        newShape.moveBefore(selectedLayer);
        
        var duration = selectedLayer.outPoint - selectedLayer.inPoint;
        newShape.inPoint = selectedLayer.inPoint;
        newShape.outPoint = newShape.inPoint + duration;
    }
    // Case 3: Both active
    else if (autoParentLayers && matchDuration && selectedLayers.length > 0) {
        for (var i = selectedLayers.length - 1; i >= 0; i--) {
            var selectedLayer = selectedLayers[i];
            var newShape = comp.layers.addShape();
            
            newShape.moveBefore(selectedLayer);
            newShape.position.setValue(selectedLayer.position.value);

            if (selectedLayer.parent == null) {
                selectedLayer.setParentWithJump(newShape);
            } else {
                var currentParent = selectedLayer.parent;
                newShape.setParentWithJump(currentParent);
                selectedLayer.setParentWithJump(newShape);
            }

            var currentPosition = selectedLayer.position.value;
            selectedLayer.position.setValue([0, 0].concat(currentPosition.length > 2 ? [currentPosition[2]] : []));

            newShape.inPoint = selectedLayer.inPoint;
            newShape.outPoint = selectedLayer.outPoint;
        }
    }
    // Case 4: None active
    else {
        app.executeCommand(3736); // ID for "New Shape Layer"
    }

    app.endUndoGroup();
}

// Function to create an adjustment layer
function createAdjustmentLayer() {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) {
        alert("No active composition. Please create a composition first.");
        return;
    }

    app.beginUndoGroup("Create Adjustment Layer");
    app.executeCommand(2279); // ID for "New Adjustment Layer"
    app.endUndoGroup();
}

// Function to delete selected layers
function deleteLayer() {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) {
        alert("No active composition. Please create a composition first.");
        return;
    }
    var selectedLayers = comp.selectedLayers;
    if (selectedLayers.length === 0) {
        alert("No layers selected. Select at least one layer to delete.");
        return;
    }

    // Get the checkbox state from user preferences
    var showConfirmation = app.settings.haveSetting("LayersPanePlus", "showDeleteConfirmation") ? 
                          app.settings.getSetting("LayersPanePlus", "showDeleteConfirmation") === "true" : 
                          true; // Default to show confirmation

    var proceed = true;
    if (showConfirmation) {
        proceed = confirm("Are you sure you want to delete " + selectedLayers.length + " layer(s)?");
    }

    if (proceed) {
        app.beginUndoGroup("Delete Layers");
        for (var i = 0; i < selectedLayers.length; i++) {
            selectedLayers[i].remove();
        }
        app.endUndoGroup();
    }
}

// Function to create a sequence of layers based on selection order
function createLayerSequence() {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) {
        alert("No active composition. Please create a composition first.");
        return;
    }

    var selectedLayers = comp.selectedLayers;
    if (selectedLayers.length < 2) {
        alert("Select at least two layers to create a sequence.");
        return;
    }

    app.beginUndoGroup("Create Layer Sequence");

    // Use the inPoint of the first selected layer
    var startTime = selectedLayers[0].inPoint;
    var currentTime = startTime;

    // Process layers in normal order
    for (var i = 0; i < selectedLayers.length; i++) {
        var layer = selectedLayers[i];
        var layerDuration = layer.outPoint - layer.inPoint;

        // Calculate the offset needed to move the layer
        var offset = currentTime - layer.inPoint;
        
        // Move the layer adjusting its start time
        layer.startTime += offset;

        // Update the time for the next layer
        currentTime += layerDuration;
    }

    app.endUndoGroup();
}

// Function to split layers based on user selection
function splitLayersAtCurrentTime() {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) {
        alert("No active composition. Please create a composition first.");
        return;
    }

    var currentTime = comp.time;
    var layers = comp.layers;
    var selectedLayers = comp.selectedLayers;

    app.beginUndoGroup("Split Layers");

    // Get the checkbox state from user preferences
    var deleteSplitPart = app.settings.haveSetting("LayersPanePlus", "deleteSplitPart") ? 
                         app.settings.getSetting("LayersPanePlus", "deleteSplitPart") === "true" : 
                         false;

    if (selectedLayers.length > 0) {
        // User has selected specific layers
        for (var i = 0; i < selectedLayers.length; i++) {
            var layer = selectedLayers[i];
            if (currentTime > layer.inPoint && currentTime < layer.outPoint) {
                if (deleteSplitPart) {
                    // If checkbox is active, duplicate and delete
                    var newLayer = layer.duplicate();
                    newLayer.inPoint = currentTime;
                    layer.outPoint = currentTime;
                    newLayer.remove();
                } else {
                    // If checkbox is inactive, use native split command
                    app.executeCommand(2158); // ID correct for "Split Layer" command
                }
            }
        }
    } else {
        // No layers selected, split all applicable layers
        var layersToSplit = [];
        // First identify layers that can be split
        for (var i = 1; i <= layers.length; i++) {
            var layer = layers[i];
            if (currentTime > layer.inPoint && currentTime < layer.outPoint) {
                layersToSplit.push(layer);
            }
        }

        // Deselect all layers first
        for (var i = 1; i <= layers.length; i++) {
            layers[i].selected = false;
        }

        // Now process identified layers
        for (var i = 0; i < layersToSplit.length; i++) {
            var layer = layersToSplit[i];
            if (deleteSplitPart) {
                // If checkbox is active, duplicate and delete
                var newLayer = layer.duplicate();
                newLayer.inPoint = currentTime;
                layer.outPoint = currentTime;
                newLayer.remove();
            } else {
                // If checkbox is inactive, select all layers to split
                layer.selected = true;
            }
        }

        // If checkbox is inactive, execute command once for all selected layers
        if (!deleteSplitPart && layersToSplit.length > 0) {
            app.executeCommand(2158); // ID correct for "Split Layer" command
        }
    }

    app.endUndoGroup();
}

// Function to precompose selected layers
function precomposeSelectedLayers() {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) {
        alert("No active composition. Please create a composition first.");
        return;
    }

    var selectedLayers = comp.selectedLayers;

    if (selectedLayers.length === 0) {
        alert("No layers selected. Please select at least one layer to precompose.");
        return;
    }

    app.beginUndoGroup("Precompose Layers");

    // Execute the native precompose command
    app.executeCommand(2071);

    app.endUndoGroup();
}

// Function to create a new composition using the native After Effects dialog
function createNewCompositionNative() {
    // Execute the native New Composition command with correct ID
    app.executeCommand(2000); // 2000 is the ID for "New Composition"
}

// Function to show help and documentation
function showHelp() {
    var helpWindow = new Window("dialog", "Help and Documentation");
    helpWindow.alignChildren = "center";

    var helpText = "Script Guide";

    var featuresText = "Script Features:\n\n" +
        "- Create Text Layer\n" +
        "- Create Solid Layer\n" +
        "- Create Null Object\n" +
        "- Create Shape Layer\n" +
        "- Create Camera\n" +
        "- Create Light\n" +
        "- Create Adjustment Layer\n" +
        "- Delete Selected Layer\n" +
        "- Create Layer Sequence\n" +
        "- Split Layers at Current Time\n" +
        "- Precompose Selected Layers\n" +
        "- Create New Composition\n\n" +
        "Advanced Layer Creation Options:\n" +
        "- Auto Parent Layers (Only for Text, Shape and Null layers)\n" +
        "- Match Layer Duration (Only for Text, Shape and Null layers)\n\n" +
        "Note: Auto Parent and Match Duration options do not work with Solid, Light, Camera, and Adjustment layers because there is no native way to implement these features for those layer types in After Effects.\n\n" +
        "Additional Settings:\n" +
        "- Auto Delete Split Parts\n" +
        "- Show Delete Confirmation\n\n" +
        "If you need help or want to provide feedback on the script, you can contact me here:\n\n";

    var contactText = " Copy link below ";

    var helpPanel = helpWindow.add("panel");
    helpPanel.alignChildren = "left";

    var helpTextElement = helpPanel.add("statictext", undefined, helpText);
    helpTextElement.alignment = "center";

    var featuresTextElement = helpPanel.add("statictext", undefined, featuresText, { multiline: true });
    featuresTextElement.preferredSize.width = 300;

    var contactTextElement = helpPanel.add("statictext", undefined, contactText, { multiline: true });
    contactTextElement.alignment = "center";

    var linkText = "linktr.ee/Dony.ae";
    var linkTextBox = helpPanel.add("edittext", undefined, linkText, { multiline: false, readonly: true });
    linkTextBox.alignment = "center";

    helpWindow.show();
}

// Function to build the user interface
function myScript_buildUI(thisObj) {
    var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Layers Pane Plus", undefined, { resizeable: true, closeButton: false });

    var res = "group{orientation:'column', alignChildren:['center','top'],\
            groupOne: Group{orientation:'row', alignChildren:['left','top'], spacing: 10,\
                createTextButton: IconButton{image: 'LpPlusAssets/path_to_text_icon.png', helpTip: 'Create Text Layer'},\
                createSolidButton: IconButton{image: 'LpPlusAssets/path_to_solid_icon.png', helpTip: 'Create Solid Layer'},\
                createLightButton: IconButton{image: 'LpPlusAssets/path_to_light_icon.png', helpTip: 'Create Light'},\
            },\
            groupTwo: Group{orientation:'row', alignChildren:['left','top'], spacing: 10,\
                createCameraButton: IconButton{image: 'LpPlusAssets/path_to_camera_icon.png', helpTip: 'Create Camera'},\
                createNullButton: IconButton{image: 'LpPlusAssets/path_to_null_icon.png', helpTip: 'Create Null Object'},\
                createShapeButton: IconButton{image: 'LpPlusAssets/path_to_shape_icon.png', helpTip: 'Create Shape Layer'},\
            },\
            groupThree: Group{orientation:'row', alignChildren:['left','top'], spacing: 10,\
                createAdjustmentButton: IconButton{image: 'LpPlusAssets/path_to_adjustment_icon.png', helpTip: 'Create Adjustment Layer'},\
                deleteLayerButton: IconButton{image: 'LpPlusAssets/path_to_delete_icon.png', helpTip: 'Delete Layer'},\
                createSequenceButton: IconButton{image: 'LpPlusAssets/path_to_sequence_icon.png', helpTip: 'Create Layer Sequence'},\
            },\
            groupFour: Group{orientation:'row', alignChildren:['left','top'], spacing: 10,\
                splitLayerButton: IconButton{image: 'LpPlusAssets/path_to_split_icon.png', helpTip: 'Split Layers at Current Time'},\
                createCompositionButton: IconButton{image: 'LpPlusAssets/path_to_create_comp_icon.png', helpTip: 'Create New Composition'},\
                precomposeLayersButton: IconButton{image: 'LpPlusAssets/path_to_precompose_icon.png', helpTip: 'Precompose Selected Layers'},\
            },\
            groupFive: Group{orientation:'row', alignChildren:['left','top'], spacing: 10,\
                helpButton: IconButton{image: 'LpPlusAssets/path_to_help_icon.png', helpTip: 'Help'},\
                settingsButton: IconButton{image: 'LpPlusAssets/path_to_settings_icon.png', helpTip: 'Open Settings Panel'}\
            },\
            madeByText: StaticText{text:'Made by dony.!', alignment:['center','bottom']}\
        }";

    myPanel.grp = myPanel.add(res);

    // Function to update the layout based on panel size
    function updateLayout() {
        var width = myPanel.size[0];
        var height = myPanel.size[1];

        // Default to three buttons per row
        var newOrientation = 'column';
        var groupOrientation = 'row';

        // Adjust orientation based on available space
        if (width < 150) {
            // If the width is very small, stack everything vertically
            newOrientation = 'column';
            groupOrientation = 'column';
        } else if (width >= 150 && width <= 650) {
            // If the width is moderate, keep three buttons per row
            newOrientation = 'column';
            groupOrientation = 'row';
        } else {
            // If the width is large, keep the default layout
            newOrientation = 'row';
            groupOrientation = 'row';
        }

        // Main panel configuration
        myPanel.grp.orientation = newOrientation;
        myPanel.grp.alignChildren = ['center', 'top'];
        myPanel.grp.spacing = 5; // Spacing between groups
        
        var groups = [
            myPanel.grp.groupOne,
            myPanel.grp.groupTwo,
            myPanel.grp.groupThree,
            myPanel.grp.groupFour,
            myPanel.grp.groupFive
        ];

        // Apply settings to each group
        for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            group.orientation = groupOrientation;
            
            // Specific configuration for centering
            if (groupOrientation === 'row') {
                group.alignment = ['center', 'top'];
                group.alignChildren = ['left', 'center'];
                group.spacing = 4; // Spacing between buttons
                
                // Ensure buttons maintain original size
                for (var j = 0; j < group.children.length; j++) {
                    var button = group.children[j];
                    button.alignment = ['left', 'center'];
                    // Ensure button maintains original size
                    if (button.size) {
                        button.minimumSize = button.size;
                        button.maximumSize = button.size;
                    }
                }
            } else {
                group.alignment = ['center', 'top'];
                group.alignChildren = ['center', 'top'];
                group.spacing = 4;
                
                for (var j = 0; j < group.children.length; j++) {
                    var button = group.children[j];
                    button.alignment = ['center', 'top'];
                    // Ensure button maintains original size
                    if (button.size) {
                        button.minimumSize = button.size;
                        button.maximumSize = button.size;
                    }
                }
            }
        }

        // Ensure "Made by" text is centered
        myPanel.grp.madeByText.alignment = ['center', 'bottom'];

        // Force layout update
        myPanel.layout.layout(true);
        myPanel.layout.resize();
    }

    // Event handlers for the buttons
    myPanel.grp.groupOne.createTextButton.onClick = function () {
        createTextLayer();
    }

    myPanel.grp.groupOne.createSolidButton.onClick = function () {
        createSolidLayer();
    }

    myPanel.grp.groupOne.createLightButton.onClick = function () {
        createLight();
    }

    myPanel.grp.groupTwo.createCameraButton.onClick = function () {
        createCamera();
    }

    myPanel.grp.groupTwo.createNullButton.onClick = function () {
        createNullObject();
    }

    myPanel.grp.groupTwo.createShapeButton.onClick = function () {
        createShapeLayer();
    }

    myPanel.grp.groupThree.createAdjustmentButton.onClick = function () {
        createAdjustmentLayer();
    }

    myPanel.grp.groupThree.deleteLayerButton.onClick = function () {
        deleteLayer();
    }

    myPanel.grp.groupThree.createSequenceButton.onClick = function () {
        createLayerSequence();
    }

    myPanel.grp.groupFour.splitLayerButton.onClick = function () {
        splitLayersAtCurrentTime();
    }

    myPanel.grp.groupFour.createCompositionButton.onClick = function () {
        createNewCompositionNative();
    }

    myPanel.grp.groupFour.precomposeLayersButton.onClick = function () {
        precomposeSelectedLayers();
    }

    myPanel.grp.groupFive.helpButton.onClick = function () {
        showHelp();
    }

    // Event for the "Settings" button
    myPanel.grp.groupFive.settingsButton.onClick = function () {
        buildSettingsPanel(myPanel);
    }

    // Handle window resizing
    myPanel.onResizing = myPanel.onResize = function () {
        updateLayout();
    };

    myPanel.layout.layout(true);

    return myPanel;
}

// Initialize the script
function myScript(thisObj) {
    var myScriptPal = myScript_buildUI(thisObj);

    if (myScriptPal != null && myScriptPal instanceof Window) {
        myScriptPal.center();
        myScriptPal.show();
    }
}

// Function to build the settings panel
function buildSettingsPanel(parentPanel) {
    var settingsWindow = new Window("dialog", "Settings");
    settingsWindow.alignChildren = ["fill", "top"];
    settingsWindow.orientation = "column";
    settingsWindow.spacing = 10;
    settingsWindow.margins = [20, 20, 20, 20];

    // Options panel
    var optionsGroup = settingsWindow.add("group");
    optionsGroup.orientation = "column";
    optionsGroup.alignChildren = ["fill", "top"];
    optionsGroup.spacing = 10;

    var optionsPanel = optionsGroup.add("panel", undefined, "Script Settings");
    optionsPanel.alignChildren = ["fill", "top"];
    optionsPanel.orientation = "column";
    optionsPanel.spacing = 15;
    optionsPanel.margins = [20, 20, 20, 20];

    // Checkbox: Auto Delete Split
    var deleteSplitCheckbox = optionsPanel.add("checkbox", undefined, "Auto Delete Split");
    deleteSplitCheckbox.helpTip = "Automatically delete split parts";
    deleteSplitCheckbox.value = app.settings.haveSetting("LayersPanePlus", "deleteSplitPart") ? 
                               app.settings.getSetting("LayersPanePlus", "deleteSplitPart") === "true" : 
                               false;

    // Checkbox: Show Delete Confirmation
    var showDeleteConfirmCheckbox = optionsPanel.add("checkbox", undefined, "Show Delete Confirmation");
    showDeleteConfirmCheckbox.helpTip = "Show confirmation dialog before deleting layers";
    showDeleteConfirmCheckbox.value = app.settings.haveSetting("LayersPanePlus", "showDeleteConfirmation") ? 
                                       app.settings.getSetting("LayersPanePlus", "showDeleteConfirmation") === "true" : 
                                       true;

    // Panel for advanced layer creation options
    var layerOptionsPanel = optionsPanel.add("panel", undefined, "Layer Creation Options");
    layerOptionsPanel.alignChildren = ["fill", "top"];
    layerOptionsPanel.orientation = "column";
    layerOptionsPanel.spacing = 10;
    layerOptionsPanel.margins = [10, 15, 10, 10];

    // Checkbox: Auto Parent Layers
    var autoParentLayersCheckbox = layerOptionsPanel.add("checkbox", undefined, "Auto Parent Layers");
    autoParentLayersCheckbox.helpTip = "Automatically parent selected layers to new layers\n(Only works with Text, Shape and Null layers)";
    autoParentLayersCheckbox.value = app.settings.haveSetting("LayersPanePlus", "autoParentLayers") ? 
                                   app.settings.getSetting("LayersPanePlus", "autoParentLayers") === "true" : 
                                   false;

    // Checkbox: Match New Layer Duration
    var matchDurationCheckbox = layerOptionsPanel.add("checkbox", undefined, "Match Layer Duration");
    matchDurationCheckbox.helpTip = "Adjust the duration of new layers to match the selected layer's duration\n(Only works with Text, Shape and Null layers)";
    matchDurationCheckbox.value = app.settings.haveSetting("LayersPanePlus", "matchNewLayerDuration") ? 
                                  app.settings.getSetting("LayersPanePlus", "matchNewLayerDuration") === "true" : 
                                  false;

    // Informational text about limitations
    var infoText = layerOptionsPanel.add("statictext", undefined, "Note: Layer Creation Options only work with Text, Shape and Null layers.", {multiline: true});
    infoText.graphics.foregroundColor = infoText.graphics.newPen(infoText.graphics.PenType.SOLID_COLOR, [0.7, 0.7, 0.7], 1);

    // Separator
    settingsWindow.add("panel", undefined, "").border = "thin";

    // Version information
    var versionGroup = settingsWindow.add("group");
    versionGroup.orientation = "row";
    versionGroup.alignment = ["fill", "bottom"];
    versionGroup.spacing = 10;

    var versionText = versionGroup.add("statictext", undefined, "Version: 2.0");
    versionText.alignment = ["left", "center"];
    versionText.graphics.font = ScriptUI.newFont("Arial", "BOLD", 12);

    // OK and Cancel buttons
    var buttonsGroup = settingsWindow.add("group");
    buttonsGroup.orientation = "row";
    buttonsGroup.alignChildren = ["center", "center"];
    buttonsGroup.spacing = 20;

    var okButton = buttonsGroup.add("button", undefined, "OK", { name: "ok" });
    var cancelButton = buttonsGroup.add("button", undefined, "Cancel", { name: "cancel" });

    buttonsGroup.alignment = ["right", "center"];

    okButton.onClick = function() {
        app.settings.saveSetting("LayersPanePlus", "deleteSplitPart", deleteSplitCheckbox.value);
        app.settings.saveSetting("LayersPanePlus", "showDeleteConfirmation", showDeleteConfirmCheckbox.value);
        app.settings.saveSetting("LayersPanePlus", "autoParentLayers", autoParentLayersCheckbox.value);
        app.settings.saveSetting("LayersPanePlus", "matchNewLayerDuration", matchDurationCheckbox.value);
        settingsWindow.close();
    }

    cancelButton.onClick = function() {
        settingsWindow.close();
    }

    settingsWindow.minimumSize = [300, 300];
    settingsWindow.center();
    settingsWindow.show();
}

// Initialize the script
myScript(this);