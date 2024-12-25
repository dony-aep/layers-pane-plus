/* Version 1.7

 Layers Pane Plus by Dony

 Author: dony.

 This script provides advanced functionality for creating and managing layers in Adobe After Effects.
 It includes features for creating various layer types, deleting layers, sequencing layers, splitting layers at the current time indicator, precomposing layers, and creating new compositions.

 Features:
 - Create layers: Text, Solid, Null Object, Shape, Camera, Adjustment
 - Delete selected layers
 - Create layer sequences based on selection order
 - Split layers at the current time indicator (Shortcut: Ctrl+Shift+D)
 - Precompose selected layers (Shortcut: Ctrl+Alt+C)
 - Create new composition
 - User-friendly interface with icon buttons
 - Dockable panel in the workspace
 - Resizable window with responsive button alignment

*/

// Function to get the next layer name based on the existing layers in the project
function getNextLayerName(baseName) {
    var maxCount = 0;
    var itemName;
    for (var i = 1; i <= app.project.numItems; i++) {
        itemName = app.project.item(i).name;
        if (itemName.indexOf(baseName) === 0) {
            var count = parseInt(itemName.replace(baseName + " ", ""), 10);
            if (!isNaN(count) && count > maxCount) {
                maxCount = count;
            }
        }
    }
    return baseName + " " + (maxCount + 1);
}

// Function to create a text layer
function createTextLayer() {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) {
        alert("No active composition. Please create a composition first.");
        return;
    }

    app.beginUndoGroup("Create Text Layer");

    // Store the original number of layers
    var originalLayerCount = comp.numLayers;

    // Execute the native New Text Layer command
    app.executeCommand(2836); // 2836 is the ID for "New Text Layer"

    // Check if a new layer was added
    if (comp.numLayers > originalLayerCount) {
        var newLayer = comp.layer(comp.numLayers);
        
        // Function to update layer name
        function updateLayerName() {
            var userGivenName = newLayer.text.sourceText.value;
            
            if (newLayer.name === "<empty text layer>") {
                if (userGivenName === "") {
                    newLayer.name = getNextLayerName("Text");
                } else {
                    newLayer.name = getUniqueLayerName(userGivenName, comp);
                }
            }
        }

        // Add an event listener to detect changes in the text
        newLayer.text.sourceText.expression = "value;";

        // Update name if text value changes
        newLayer.text.sourceText.addProperty("Source Text").expression = "if (value !== text.sourceText.value) { value = text.sourceText.value; updateLayerName(); }";

        updateLayerName(); // Initial update in case the text value is already set
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

    // Store the original number of layers
    var originalLayerCount = comp.numLayers;

    // Execute the native Solid Settings dialog command
    app.executeCommand(2038); // 2038 is the ID for "Solid..."

    // Check if a new layer was added
    if (comp.numLayers > originalLayerCount) {
        var newLayer = comp.layer(1);
        
        // Keep the name given by the user in the native dialog
        var userGivenName = newLayer.name;
        
        // If the user didn't change the default name, we can add a number to make it unique
        if (userGivenName === "Solid") {
            newLayer.name = getNextLayerName("Solid");
        } else {
            // If the user gave a custom name, we keep it but ensure it's unique
            newLayer.name = getUniqueLayerName(userGivenName, comp);
        }
    }
}

// Function to get a unique layer name in the composition
function getUniqueLayerName(baseName, comp) {
    var newName = baseName;
    var counter = 1;
    var isUnique = false;

    while (!isUnique) {
        isUnique = true;
        for (var i = 1; i <= comp.numLayers; i++) {
            if (comp.layer(i).name === newName && comp.layer(i) !== comp.layer(1)) {
                isUnique = false;
                break;
            }
        }
        if (!isUnique) {
            counter++;
            newName = baseName + " " + counter;
        }
    }

    return newName;
}

// Function to create a null object
function createNullObject() {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) {
        alert("No active composition. Please create a composition first.");
        return;
    }

    // Store the original number of layers
    var originalLayerCount = comp.numLayers;

    // Execute the native New Null Object command
    app.executeCommand(2767); // 2767 is the ID for "New Null Object"

    // Check if a new layer was added
    if (comp.numLayers > originalLayerCount) {
        var newLayer = comp.layer(1);
        
        // Keep the name given by the user in the native dialog
        var userGivenName = newLayer.name;
        
        // If the user didn't change the default name, we can add a number to make it unique
        if (userGivenName === "Null Object") {
            newLayer.name = getNextLayerName("Null Object");
        } else {
            // If the user gave a custom name, we keep it but ensure it's unique
            newLayer.name = getUniqueLayerName(userGivenName, comp);
        }
    }
}

// Function to create a shape layer
function createShapeLayer() {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) {
        alert("No active composition. Please create a composition first.");
        return;
    }

    // Store the original number of layers
    var originalLayerCount = comp.numLayers;

    // Execute the native New Shape Layer command
    app.executeCommand(3736); // 3736 is the ID for "New Shape Layer"

    // Check if a new layer was added
    if (comp.numLayers > originalLayerCount) {
        var newLayer = comp.layer(1);
        
        // Keep the name given by the user in the native dialog
        var userGivenName = newLayer.name;
        
        // If the user didn't change the default name, we can add a number to make it unique
        if (userGivenName === "Shape Layer") {
            newLayer.name = getNextShapeLayerName("Shape Layer");
        } else {
            // If the user gave a custom name, we keep it but ensure it's unique
            newLayer.name = getUniqueLayerName(userGivenName, comp);
        }
    }
}

// Function to get the next shape layer name
function getNextShapeLayerName(baseName) {
    var maxCount = 0;
    var itemName;
    for (var i = 1; i <= app.project.activeItem.layers.length; i++) {
        itemName = app.project.activeItem.layers[i].name;
        if (itemName.indexOf(baseName) === 0) {
            var count = parseInt(itemName.replace(baseName + " ", ""), 10);
            if (!isNaN(count) && count > maxCount) {
                maxCount = count;
            }
        }
    }
    return baseName + " " + (maxCount + 1);
}

// Function to create a camera
function createCamera() {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) {
        alert("No active composition. Please create a composition first.");
        return;
    }

    // Store the original number of layers
    var originalLayerCount = comp.numLayers;

    // Execute the native New Camera command
    app.executeCommand(2564); // 2564 is the ID for "New Camera"

    // Check if a new layer was added
    if (comp.numLayers > originalLayerCount) {
        var newLayer = comp.layer(1);
        
        // Keep the name given by the user in the native dialog
        var userGivenName = newLayer.name;
        
        // If the user didn't change the default name, we can add a number to make it unique
        if (userGivenName === "Camera") {
            newLayer.name = getNextCameraLayerName("Camera");
        } else {
            // If the user gave a custom name, we keep it but ensure it's unique
            newLayer.name = getUniqueLayerName(userGivenName, comp);
        }
    }
}

// Function to get the next camera layer name
function getNextCameraLayerName(baseName) {
    var maxCount = 0;
    var itemName;
    for (var i = 1; i <= app.project.activeItem.layers.length; i++) {
        itemName = app.project.activeItem.layers[i].name;
        if (itemName.indexOf(baseName) === 0) {
            var count = parseInt(itemName.replace(baseName + " ", ""), 10);
            if (!isNaN(count) && count > maxCount) {
                maxCount = count;
            }
        }
    }
    return baseName + " " + (maxCount + 1);
}

// Function to create an adjustment layer
function createAdjustmentLayer() {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) {
        alert("No active composition. Please create a composition first.");
        return;
    }

    // Store the original number of layers
    var originalLayerCount = comp.numLayers;

    // Execute the native New Adjustment Layer command
    app.executeCommand(2279); // 2279 is the ID for "New Adjustment Layer"

    // Check if a new layer was added
    if (comp.numLayers > originalLayerCount) {
        var newLayer = comp.layer(1);
        
        // Keep the name given by the user in the native dialog
        var userGivenName = newLayer.name;
        
        // If the user didn't change the default name, we can add a number to make it unique
        if (userGivenName === "Adjustment Layer") {
            newLayer.name = getNextLayerName("Adjustment Layer");
        } else {
            // If the user gave a custom name, we keep it but ensure it's unique
            newLayer.name = getUniqueLayerName(userGivenName, comp);
        }
    }
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
    for (var i = 0; i < selectedLayers.length; i++) {
        selectedLayers[i].remove();
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

    // Determine the direction of selection
    var isBottomToTop = selectedLayers[0].index < selectedLayers[selectedLayers.length - 1].index;

    // Sort layers based on their selection order
    selectedLayers.sort(function(a, b) {
        return isBottomToTop ? a.index - b.index : b.index - a.index;
    });

    // Always start with the first layer in the sorted array
    var startLayer = selectedLayers[0];
    var currentTime = startLayer.inPoint;

    for (var i = 0; i < selectedLayers.length; i++) {
        var layer = selectedLayers[i];
        var layerDuration = layer.outPoint - layer.inPoint;

        // Move the layer to start at the current time
        var timeShift = currentTime - layer.inPoint;
        layer.startTime += timeShift;
        layer.inPoint = currentTime;
        layer.outPoint = layer.inPoint + layerDuration;

        // Update currentTime for the next layer
        currentTime = layer.outPoint;
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

    if (selectedLayers.length > 0) {
        // User has selected specific layers
        for (var i = 0; i < selectedLayers.length; i++) {
            var layer = selectedLayers[i];
            if (currentTime > layer.inPoint && currentTime < layer.outPoint) {
                layer.splitLayer(currentTime);
            }
        }
    } else {
        // No layers selected, split all applicable layers
        for (var i = layers.length; i >= 1; i--) {
            var layer = layers[i];
            if (currentTime > layer.inPoint && currentTime < layer.outPoint) {
                layer.splitLayer(currentTime);
            }
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
        "- Create Adjustment Layer\n" +
        "- Delete Selected Layer\n" +
        "- Create Layer Sequence\n" +
        "- Split Layers at Current Time\n" +
        "- Precompose Selected Layers\n" +
        "- Create New Composition\n\n" +
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
function myScript(thisObj) {
    function myScript_buildUI(thisObj) {
        var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Dockable Script", undefined, { resizeable: true, closeButton: false });

        var res = "group{orientation:'column', alignChildren:['center','top'],\
                demoText: StaticText{text:'V1.7', alignment:['center','top']},\
                groupOne: Group{orientation:'row', alignChildren:['left','top'], spacing: 10,\
                    createTextButton: IconButton{image: 'LpPlusAssets/path_to_text_icon.png', helpTip: 'Create Text Layer'},\
                    createSolidButton: IconButton{image: 'LpPlusAssets/path_to_solid_icon.png', helpTip: 'Create Solid Layer'},\
                    createNullButton: IconButton{image: 'LpPlusAssets/path_to_null_icon.png', helpTip: 'Create Null Object'},\
                },\
                groupTwo: Group{orientation:'row', alignChildren:['left','top'], spacing: 10,\
                    createShapeButton: IconButton{image: 'LpPlusAssets/path_to_shape_icon.png', helpTip: 'Create Shape Layer'},\
                    createCameraButton: IconButton{image: 'LpPlusAssets/path_to_camera_icon.png', helpTip: 'Create Camera'},\
                    createAdjustmentButton: IconButton{image: 'LpPlusAssets/path_to_adjustment_icon.png', helpTip: 'Create Adjustment Layer'},\
                },\
                groupThree: Group{orientation:'row', alignChildren:['left','top'], spacing: 10,\
                    deleteLayerButton: IconButton{image: 'LpPlusAssets/path_to_delete_icon.png', helpTip: 'Delete Layer'},\
                    createSequenceButton: IconButton{image: 'LpPlusAssets/path_to_sequence_icon.png', helpTip: 'Create Layer Sequence'},\
                    splitLayerButton: IconButton{image: 'LpPlusAssets/path_to_split_icon.png', helpTip: 'Split Layers at Current Time'},\
                },\
                groupFour: Group{orientation:'row', alignChildren:['left','top'], spacing: 10,\
                    createCompositionButton: IconButton{image: 'LpPlusAssets/path_to_create_comp_icon.png', helpTip: 'Create New Composition'},\
                    precomposeLayersButton: IconButton{image: 'LpPlusAssets/path_to_precompose_icon.png', helpTip: 'Precompose Selected Layers'},\
                    helpButton: IconButton{image: 'LpPlusAssets/path_to_help_icon.png', helpTip: 'Help'},\
                },\
                madeByText: StaticText{text:'Made by dony.!', alignment:['center','bottom']}\
            }";

        myPanel.grp = myPanel.add(res);

        // Event handlers for the buttons
        myPanel.grp.groupOne.createTextButton.onClick = function () {
            createTextLayer();
        }

        myPanel.grp.groupOne.createSolidButton.onClick = function () {
            createSolidLayer();
        }

        myPanel.grp.groupOne.createNullButton.onClick = function () {
            createNullObject();
        }

        myPanel.grp.groupTwo.createShapeButton.onClick = function () {
            createShapeLayer();
        }

        myPanel.grp.groupTwo.createCameraButton.onClick = function () {
            createCamera();
        }

        myPanel.grp.groupTwo.createAdjustmentButton.onClick = function () {
            createAdjustmentLayer();
        }

        myPanel.grp.groupThree.deleteLayerButton.onClick = function () {
            deleteLayer();
        }

        myPanel.grp.groupThree.createSequenceButton.onClick = function () {
            createLayerSequence();
        }

        myPanel.grp.groupThree.splitLayerButton.onClick = function () {
            splitLayersAtCurrentTime();
        }

        myPanel.grp.groupFour.createCompositionButton.onClick = function () {
            createNewCompositionNative();
        }

        myPanel.grp.groupFour.precomposeLayersButton.onClick = function () {
            precomposeSelectedLayers();
        }

        myPanel.grp.groupFour.helpButton.onClick = function () {
            showHelp();
        }

        // Handle window resizing
        myPanel.onResizing = myPanel.onResize = function () {
            this.layout.resize();
        };

        myPanel.layout.layout(true);

        return myPanel;
    }

    var myScriptPal = myScript_buildUI(thisObj);

    if (myScriptPal != null && myScriptPal instanceof Window) {
        myScriptPal.show();
    }
}

// Initialize the script
myScript(this);
