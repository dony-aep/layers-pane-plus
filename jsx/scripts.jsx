/* 
   Layers Pane Plus v3.1.0 - Converted for CEP Extension
   This version contains the original script logic.
   
   NOTE: This ExtendScript file (jsx/scripts.jsx) is intentionally loaded from
   main.js to provide native extended functionality in After Effects.
   This allows integrating ExtendScript commands with the HTML/JS interface.
*/

function createTextLayer(customText) {
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

    function createAndSetupTextLayer(referenceLayer) {
        var newText = comp.layers.addText();
        if (customText) {
            newText.property("Source Text").setValue(customText);
        }
        return newText;
    }

    if (autoParentLayers && !matchDuration && selectedLayers.length > 0) {
        for (var i = selectedLayers.length - 1; i >= 0; i--) {
            var selectedLayer = selectedLayers[i];
            var newText = createAndSetupTextLayer(selectedLayer);
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
    } else if (!autoParentLayers && matchDuration && selectedLayers.length > 0) {
        var selectedLayer = selectedLayers[0];
        var newText = createAndSetupTextLayer(selectedLayer);
        newText.moveBefore(selectedLayer);
        var duration = selectedLayer.outPoint - selectedLayer.inPoint;
        newText.inPoint = selectedLayer.inPoint;
        newText.outPoint = newText.inPoint + duration;
    } else if (autoParentLayers && matchDuration && selectedLayers.length > 0) {
        for (var i = selectedLayers.length - 1; i >= 0; i--) {
            var selectedLayer = selectedLayers[i];
            var newText = createAndSetupTextLayer(selectedLayer);
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
    } else {
        if (customText) {
            var newText = createAndSetupTextLayer();
        } else {
            app.executeCommand(2836); // Native command for "New Text Layer"
        }
    }
    app.endUndoGroup();
}

function createSolidLayer() {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) {
        alert("No active composition. Please create a composition first.");
        return;
    }
    app.beginUndoGroup("Create Solid Layer");
    
    var selectedLayers = comp.selectedLayers;
    var autoParentLayers = app.settings.haveSetting("LayersPanePlus", "autoParentLayers") ? 
                           app.settings.getSetting("LayersPanePlus", "autoParentLayers") === "true" : 
                           false;
    var matchDuration = app.settings.haveSetting("LayersPanePlus", "matchNewLayerDuration") ? 
                       app.settings.getSetting("LayersPanePlus", "matchNewLayerDuration") === "true" : 
                       false;
    
    if (selectedLayers.length > 0 && (autoParentLayers || matchDuration)) {
        var originalTime = comp.time;
        
        // Process each selected layer
        for (var i = selectedLayers.length - 1; i >= 0; i--) {
            var selectedLayer = selectedLayers[i];
            
            // Clear selection and select only current layer to ensure proper dialog behavior
            for (var j = 1; j <= comp.layers.length; j++) {
                comp.layers[j].selected = false;
            }
            selectedLayer.selected = true;
            
            app.executeCommand(2038); // Native command for "New Solid Layer"
            
            // Get the newly created solid (should be the first selected layer after creation)
            var newSolid = comp.selectedLayers[0];
            
            if (newSolid && newSolid !== selectedLayer) {
                if (autoParentLayers) {
                    newSolid.moveBefore(selectedLayer);
                    
                    if (selectedLayer.parent == null) {
                        selectedLayer.setParentWithJump(newSolid);
                    } else {
                        var currentParent = selectedLayer.parent;
                        newSolid.setParentWithJump(currentParent);
                        selectedLayer.setParentWithJump(newSolid);
                    }
                }
                
                if (matchDuration) {
                    newSolid.inPoint = selectedLayer.inPoint;
                    newSolid.outPoint = selectedLayer.outPoint;
                }
            }
        }
        
        comp.time = originalTime;
    } else {
        app.executeCommand(2038); // Native command for "New Solid Layer"
    }
    
    app.endUndoGroup();
}

function createLight() {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) {
        alert("No active composition. Please create a composition first.");
        return;
    }
    app.beginUndoGroup("Create Light");
    
    var selectedLayers = comp.selectedLayers;
    var autoParentLayers = app.settings.haveSetting("LayersPanePlus", "autoParentLayers") ? 
                           app.settings.getSetting("LayersPanePlus", "autoParentLayers") === "true" : 
                           false;
    var matchDuration = app.settings.haveSetting("LayersPanePlus", "matchNewLayerDuration") ? 
                       app.settings.getSetting("LayersPanePlus", "matchNewLayerDuration") === "true" : 
                       false;
    
    if (selectedLayers.length > 0 && (autoParentLayers || matchDuration)) {
        var originalTime = comp.time;
        
        // Process each selected layer
        for (var i = selectedLayers.length - 1; i >= 0; i--) {
            var selectedLayer = selectedLayers[i];
            
            // Clear selection and select only current layer
            for (var j = 1; j <= comp.layers.length; j++) {
                comp.layers[j].selected = false;
            }
            selectedLayer.selected = true;
            
            app.executeCommand(2563); // Native command for "New Light"
            
            // Get the newly created light
            var newLight = comp.selectedLayers[0];
            
            if (newLight && newLight !== selectedLayer) {
                if (autoParentLayers) {
                    newLight.moveBefore(selectedLayer);
                    
                    if (selectedLayer.parent == null) {
                        selectedLayer.parent = newLight;
                    } else {
                        var currentParent = selectedLayer.parent;
                        newLight.setParentWithJump(currentParent);
                        selectedLayer.parent = newLight;
                    }
                }
                
                if (matchDuration) {
                    newLight.inPoint = selectedLayer.inPoint;
                    newLight.outPoint = selectedLayer.outPoint;
                }
            }
        }
        
        comp.time = originalTime;
    } else {
        app.executeCommand(2563); // Native command for "New Light"
    }
    
    app.endUndoGroup();
}

function createCamera() {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) {
        alert("No active composition. Please create a composition first.");
        return;
    }
    app.beginUndoGroup("Create Camera");
    
    var selectedLayers = comp.selectedLayers;
    var autoParentLayers = app.settings.haveSetting("LayersPanePlus", "autoParentLayers") ? 
                           app.settings.getSetting("LayersPanePlus", "autoParentLayers") === "true" : 
                           false;
    var matchDuration = app.settings.haveSetting("LayersPanePlus", "matchNewLayerDuration") ? 
                       app.settings.getSetting("LayersPanePlus", "matchNewLayerDuration") === "true" : 
                       false;
    
    if (selectedLayers.length > 0 && (autoParentLayers || matchDuration)) {
        var originalTime = comp.time;
        
        // Process each selected layer
        for (var i = selectedLayers.length - 1; i >= 0; i--) {
            var selectedLayer = selectedLayers[i];
            
            // Clear selection and select only current layer
            for (var j = 1; j <= comp.layers.length; j++) {
                comp.layers[j].selected = false;
            }
            selectedLayer.selected = true;
            
            app.executeCommand(2564); // Native command for "New Camera"
            
            // Get the newly created camera
            var newCamera = comp.selectedLayers[0];
            
            if (newCamera && newCamera !== selectedLayer) {
                if (autoParentLayers) {
                    newCamera.moveBefore(selectedLayer);
                    
                    if (selectedLayer.parent == null) {
                        selectedLayer.setParentWithJump(newCamera);
                    } else {
                        var currentParent = selectedLayer.parent;
                        newCamera.setParentWithJump(currentParent);
                        selectedLayer.setParentWithJump(newCamera);
                    }
                }
                
                if (matchDuration) {
                    newCamera.inPoint = selectedLayer.inPoint;
                    newCamera.outPoint = selectedLayer.outPoint;
                }
            }
        }
        
        comp.time = originalTime;
    } else {
        app.executeCommand(2564); // Native command for "New Camera"
    }
    
    app.endUndoGroup();
}

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
    } else if (!autoParentLayers && matchDuration && selectedLayers.length > 0) {
        var selectedLayer = selectedLayers[0];
        var newNull = comp.layers.addNull();
        newNull.moveBefore(selectedLayer);
        var duration = selectedLayer.outPoint - selectedLayer.inPoint;
        newNull.inPoint = selectedLayer.inPoint;
        newNull.outPoint = newNull.inPoint + duration;
    } else if (autoParentLayers && matchDuration && selectedLayers.length > 0) {
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
    } else {
        app.executeCommand(2767); // Native command for "New Null Object"
    }
    app.endUndoGroup();
}

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
    } else if (!autoParentLayers && matchDuration && selectedLayers.length > 0) {
        var selectedLayer = selectedLayers[0];
        var newShape = comp.layers.addShape();
        newShape.moveBefore(selectedLayer);
        var duration = selectedLayer.outPoint - selectedLayer.inPoint;
        newShape.inPoint = selectedLayer.inPoint;
        newShape.outPoint = newShape.inPoint + duration;
    } else if (autoParentLayers && matchDuration && selectedLayers.length > 0) {
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
    } else {
        app.executeCommand(3736); // Native command for "New Shape Layer"
    }
    app.endUndoGroup();
}

function createAdjustmentLayer() {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) {
        alert("No active composition. Please create a composition first.");
        return;
    }
    app.beginUndoGroup("Create Adjustment Layer");
    var selectedLayers = comp.selectedLayers;
    var autoParentLayers = app.settings.haveSetting("LayersPanePlus", "autoParentLayers") ? 
                           app.settings.getSetting("LayersPanePlus", "autoParentLayers") === "true" : 
                           false;
    var matchDuration = app.settings.haveSetting("LayersPanePlus", "matchNewLayerDuration") ? 
                       app.settings.getSetting("LayersPanePlus", "matchNewLayerDuration") === "true" : 
                       false;
    if (selectedLayers.length > 0 && (autoParentLayers || matchDuration)) {
        var originalTime = comp.time;
        for (var i = selectedLayers.length - 1; i >= 0; i--) {
            var selectedLayer = selectedLayers[i];
            var originalPosition = selectedLayer.position.value;
            var originalParent = selectedLayer.parent;
            comp.time = selectedLayer.inPoint;
            app.executeCommand(2279); // Native command for "New Adjustment Layer"
            var newAdjustment = comp.selectedLayers[0];
            newAdjustment.moveBefore(selectedLayer);
            if (autoParentLayers) {
                newAdjustment.parent = originalParent;
                selectedLayer.parent = newAdjustment;
                selectedLayer.position.setValue(originalPosition);
            }
            if (matchDuration) {
                newAdjustment.inPoint = selectedLayer.inPoint;
                newAdjustment.outPoint = selectedLayer.outPoint;
            }
        }
        comp.time = originalTime;
    } else {
        app.executeCommand(2279);
    }
    app.endUndoGroup();
}

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
    var showConfirmation = app.settings.haveSetting("LayersPanePlus", "showDeleteConfirmation") ? 
                           app.settings.getSetting("LayersPanePlus", "showDeleteConfirmation") === "true" : 
                           true;
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
    
    var reverseOrder = app.settings.haveSetting("LayersPanePlus", "reverseSequence") ? 
                      app.settings.getSetting("LayersPanePlus", "reverseSequence") === "true" : 
                      false;
    
    // Check if layers are already sequenced
    function areLayersSequenced(layers) {
        var tolerance = 0.001; // Small tolerance for floating point comparison
        
        for (var i = 0; i < layers.length - 1; i++) {
            var currentLayerEnd = layers[i].outPoint;
            var nextLayerStart = layers[i + 1].inPoint;
            
            // If there's a gap or overlap larger than tolerance, they're not sequenced
            if (Math.abs(currentLayerEnd - nextLayerStart) > tolerance) {
                return false;
            }
        }
        return true;
    }
    
    // Create array of layers and sort by timeline position for checking
    var layersArray = [];
    for (var i = 0; i < selectedLayers.length; i++) {
        layersArray.push(selectedLayers[i]);
    }
    
    // Sort layers by their current in-point to check sequence
    var sortedLayers = layersArray.slice(); // Create a copy
    sortedLayers.sort(function(a, b) {
        return a.inPoint - b.inPoint;
    });
    
    // Check if already sequenced
    if (areLayersSequenced(sortedLayers)) {
        var orderText = reverseOrder ? "reverse" : "normal";
        var proceed = confirm("The selected layers appear to already be sequenced.\n\nDo you want to re-sequence them in " + orderText + " order?\n\nNote: This will modify the current timing.");
        
        if (!proceed) {
            return;
        }
    }
    
    app.beginUndoGroup("Create Layer Sequence");
    
    // Store layer information before modification
    var layerInfo = [];
    for (var i = 0; i < layersArray.length; i++) {
        var layer = layersArray[i];
        layerInfo.push({
            layer: layer,
            duration: layer.outPoint - layer.inPoint,
            originalStartTime: layer.startTime
        });
    }
    
    // Find the earliest start time among all selected layers
    var earliestInPoint = layerInfo[0].layer.inPoint;
    for (var i = 1; i < layerInfo.length; i++) {
        if (layerInfo[i].layer.inPoint < earliestInPoint) {
            earliestInPoint = layerInfo[i].layer.inPoint;
        }
    }
    
    // Apply reverse order if needed
    if (reverseOrder) {
        layerInfo.reverse();
    }
    
    var currentTime = earliestInPoint;
    for (var i = 0; i < layerInfo.length; i++) {
        var info = layerInfo[i];
        var layer = info.layer;
        
        // Calculate the offset needed to move the layer to the new position
        var targetInPoint = currentTime;
        var currentInPoint = layer.inPoint;
        var offset = targetInPoint - currentInPoint;
        
        // Use startTime to move the layer, preserving its internal timing
        layer.startTime += offset;
        
        currentTime += info.duration;
    }
    
    app.endUndoGroup();
}

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
    var deleteSplitPart = app.settings.haveSetting("LayersPanePlus", "deleteSplitPart") ? 
                         app.settings.getSetting("LayersPanePlus", "deleteSplitPart") === "true" : 
                         false;
    var trimDirection = app.settings.haveSetting("LayersPanePlus", "trimDirection") ? 
                       app.settings.getSetting("LayersPanePlus", "trimDirection") : 
                       "left";
    var additionalFrames = app.settings.haveSetting("LayersPanePlus", "additionalFrames") ? 
                          parseInt(app.settings.getSetting("LayersPanePlus", "additionalFrames")) : 
                          0;
    
    var frameRate = comp.frameRate;
    var additionalTime = additionalFrames / frameRate;
    
    if (selectedLayers.length > 0) {
        for (var i = 0; i < selectedLayers.length; i++) {
            var layer = selectedLayers[i];
            if (currentTime > layer.inPoint && currentTime < layer.outPoint) {
                if (deleteSplitPart) {
                    if (trimDirection === "left") {
                        // Trim left part (keep right part)
                        var originalOutPoint = layer.outPoint;                        
                        var newInPoint = Math.max(layer.inPoint, currentTime - additionalTime);
                        layer.inPoint = newInPoint;                        
                        layer.outPoint = originalOutPoint;
                    } else {
                        // Trim right part (keep left part)
                        var newOutPoint = Math.min(layer.outPoint, currentTime + additionalTime);
                        layer.outPoint = newOutPoint;
                    }
                } else {
                    app.executeCommand(2158); // Standard split command (Native command for "Split Layer")
                }
            }
        }
    } else {
        var layersToSplit = [];
        for (var i = 1; i <= layers.length; i++) {
            var layer = layers[i];
            if (currentTime > layer.inPoint && currentTime < layer.outPoint) {
                layersToSplit.push(layer);
            }
        }
        for (var i = 1; i <= layers.length; i++) {
            layers[i].selected = false;
        }
        for (var i = 0; i < layersToSplit.length; i++) {
            var layer = layersToSplit[i];
            if (deleteSplitPart) {
                if (trimDirection === "left") {
                    var originalOutPoint = layer.outPoint;
                    var newInPoint = Math.max(layer.inPoint, currentTime - additionalTime);
                    layer.inPoint = newInPoint;
                    layer.outPoint = originalOutPoint;
                } else {
                    var newOutPoint = Math.min(layer.outPoint, currentTime + additionalTime);
                    layer.outPoint = newOutPoint;
                }
            } else {
                layer.selected = true;
            }
        }
        if (!deleteSplitPart && layersToSplit.length > 0) {
            app.executeCommand(2158); // Standard split command (Native command for "Split Layer")
        }
    }
    app.endUndoGroup();
}

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
    app.executeCommand(2071); // Native command for "Precompose Layers"
    app.endUndoGroup();
}

function createNewCompositionNative() {
    app.executeCommand(2000); // Native command for "New Composition"
}

function openCompSettings() {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) {
        alert("No active composition. Please create a composition first.");
        return;
    }
    app.executeCommand(2007); // Native command for "Open Composition Settings"
}

function openLayerSettings() {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) {
        alert("No active composition. Please create a composition first.");
        return false;
    }
    var selectedLayers = comp.selectedLayers;
    if (selectedLayers.length === 0) {
        alert("No layer selected. Please select a layer first.");
        return false;
    }
    
    // Check if multiple layers are selected - This should be checked FIRST
    if (selectedLayers.length > 1) {
        alert("Multiple layers selected (" + selectedLayers.length + " layers).\n\nPlease select only ONE layer to open its settings dialog.");
        return false;
    }
    
    // Now check the type of the single selected layer
    var selectedLayer = selectedLayers[0];
    
    if (selectedLayer instanceof TextLayer) {
        alert("Text layers don't have a settings dialog in After Effects.\n\nUse the Character and Paragraph panels instead.");
        return false;
    } else if (selectedLayer.matchName === "ADBE Vector Layer") {
        alert("Shape layers don't have a settings dialog in After Effects.\n\nUse the shape properties in the timeline panel instead.");
        return false;
    }
    
    app.executeCommand(2021); // Native command for "Open Layer Settings"
    return true;
}

function openFooterLink(customUrl) {
    var url = customUrl || "https://donyaep.vercel.app/";
    try {
        if ($.os.indexOf("Windows") !== -1) {
            // In Windows, use the "start" command
            system.callSystem('cmd /c start "" "' + url + '"');
        } else {
            // In macOS, use the "open" command
            system.callSystem('open "' + url + '"');
        }
    } catch (e) {
        alert("Error opening URL: " + e.toString());
    }
} 