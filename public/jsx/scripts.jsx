/*
   Layers Pane Plus v4.0.0 - ExtendScript host logic

   Loaded into the After Effects scripting engine via the CEP manifest
   <ScriptPath>./jsx/scripts.jsx</ScriptPath>. Its functions live in the global
   scope and are called from the React UI through CSInterface.evalScript().
*/

// Returns the active composition, or null (alerting unless silent === true). Centralizes
// the active-comp validation repeated across every action (#8).
function getActiveComp(silent) {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) {
        if (!silent) alert("No active composition. Please create a composition first.");
        return null;
    }
    return comp;
}

function createTextLayer(customText) {
    var comp = getActiveComp();
    if (!comp) return;
    app.beginUndoGroup("Create Text Layer");
    var selectedLayers = comp.selectedLayers;
    var autoParentLayers = lpGetBool("autoParentLayers", false);
    var matchDuration = lpGetBool("matchNewLayerDuration", false);

    function createAndSetupTextLayer() {
        var newText = comp.layers.addText();
        if (customText) {
            newText.property("Source Text").setValue(customText);
        }
        return newText;
    }

    if (autoParentLayers && !matchDuration && selectedLayers.length > 0) {
        for (var i = selectedLayers.length - 1; i >= 0; i--) {
            var selectedLayer = selectedLayers[i];
            var newText = createAndSetupTextLayer();
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
        for (var i = selectedLayers.length - 1; i >= 0; i--) {
            var selectedLayer = selectedLayers[i];
            var newText = createAndSetupTextLayer();
            newText.moveBefore(selectedLayer);
            newText.inPoint = selectedLayer.inPoint;
            newText.outPoint = selectedLayer.outPoint;
        }
    } else if (autoParentLayers && matchDuration && selectedLayers.length > 0) {
        for (var i = selectedLayers.length - 1; i >= 0; i--) {
            var selectedLayer = selectedLayers[i];
            var newText = createAndSetupTextLayer();
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
    var comp = getActiveComp();
    if (!comp) return;
    app.beginUndoGroup("Create Solid Layer");

    var selectedLayers = comp.selectedLayers;
    var autoParentLayers = lpGetBool("autoParentLayers", false);
    var matchDuration = lpGetBool("matchNewLayerDuration", false);

    if (selectedLayers.length > 0 && (autoParentLayers || matchDuration)) {
        var originalTime = comp.time;
        for (var i = selectedLayers.length - 1; i >= 0; i--) {
            var selectedLayer = selectedLayers[i];

            // Clear selection and select only current layer to ensure proper dialog behavior
            for (var j = 1; j <= comp.layers.length; j++) {
                comp.layers[j].selected = false;
            }
            selectedLayer.selected = true;

            app.executeCommand(2038); // Native command for "New Solid Layer"

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
    var comp = getActiveComp();
    if (!comp) return;
    app.beginUndoGroup("Create Light");

    var selectedLayers = comp.selectedLayers;
    var autoParentLayers = lpGetBool("autoParentLayers", false);
    var matchDuration = lpGetBool("matchNewLayerDuration", false);

    if (selectedLayers.length > 0 && (autoParentLayers || matchDuration)) {
        var originalTime = comp.time;
        for (var i = selectedLayers.length - 1; i >= 0; i--) {
            var selectedLayer = selectedLayers[i];

            // Clear selection and select only current layer
            for (var j = 1; j <= comp.layers.length; j++) {
                comp.layers[j].selected = false;
            }
            selectedLayer.selected = true;

            app.executeCommand(2563); // Native command for "New Light"

            var newLight = comp.selectedLayers[0];
            if (newLight && newLight !== selectedLayer) {
                if (autoParentLayers) {
                    newLight.moveBefore(selectedLayer);
                    if (selectedLayer.parent == null) {
                        selectedLayer.setParentWithJump(newLight);
                    } else {
                        var currentParent = selectedLayer.parent;
                        newLight.setParentWithJump(currentParent);
                        selectedLayer.setParentWithJump(newLight);
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
    var comp = getActiveComp();
    if (!comp) return;
    app.beginUndoGroup("Create Camera");

    var selectedLayers = comp.selectedLayers;
    var autoParentLayers = lpGetBool("autoParentLayers", false);
    var matchDuration = lpGetBool("matchNewLayerDuration", false);

    if (selectedLayers.length > 0 && (autoParentLayers || matchDuration)) {
        var originalTime = comp.time;
        for (var i = selectedLayers.length - 1; i >= 0; i--) {
            var selectedLayer = selectedLayers[i];

            // Clear selection and select only current layer
            for (var j = 1; j <= comp.layers.length; j++) {
                comp.layers[j].selected = false;
            }
            selectedLayer.selected = true;

            app.executeCommand(2564); // Native command for "New Camera"

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
    var comp = getActiveComp();
    if (!comp) return;
    app.beginUndoGroup("Create Null Object");
    var selectedLayers = comp.selectedLayers;
    var autoParentLayers = lpGetBool("autoParentLayers", false);
    var matchDuration = lpGetBool("matchNewLayerDuration", false);
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
        for (var i = selectedLayers.length - 1; i >= 0; i--) {
            var selectedLayer = selectedLayers[i];
            var newNull = comp.layers.addNull();
            newNull.moveBefore(selectedLayer);
            newNull.inPoint = selectedLayer.inPoint;
            newNull.outPoint = selectedLayer.outPoint;
        }
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
    var comp = getActiveComp();
    if (!comp) return;
    app.beginUndoGroup("Create Shape Layer");
    var selectedLayers = comp.selectedLayers;
    var autoParentLayers = lpGetBool("autoParentLayers", false);
    var matchDuration = lpGetBool("matchNewLayerDuration", false);
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
        for (var i = selectedLayers.length - 1; i >= 0; i--) {
            var selectedLayer = selectedLayers[i];
            var newShape = comp.layers.addShape();
            newShape.moveBefore(selectedLayer);
            newShape.inPoint = selectedLayer.inPoint;
            newShape.outPoint = selectedLayer.outPoint;
        }
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
    var comp = getActiveComp();
    if (!comp) return;
    app.beginUndoGroup("Create Adjustment Layer");
    var selectedLayers = comp.selectedLayers;
    var autoParentLayers = lpGetBool("autoParentLayers", false);
    var matchDuration = lpGetBool("matchNewLayerDuration", false);
    if (selectedLayers.length > 0 && (autoParentLayers || matchDuration)) {
        var originalTime = comp.time;
        for (var i = selectedLayers.length - 1; i >= 0; i--) {
            var selectedLayer = selectedLayers[i];
            var originalParent = selectedLayer.parent;
            comp.time = selectedLayer.inPoint;
            app.executeCommand(2279); // Native command for "New Adjustment Layer"
            var newAdjustment = comp.selectedLayers[0];
            newAdjustment.moveBefore(selectedLayer);
            if (autoParentLayers) {
                // setParentWithJump preserves world transform, so no manual position rewrite
                // is needed (avoids writing a wrong/locked value on animated positions).
                if (originalParent != null) newAdjustment.setParentWithJump(originalParent);
                selectedLayer.setParentWithJump(newAdjustment);
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
    var comp = getActiveComp();
    if (!comp) return;
    var selectedLayers = comp.selectedLayers;
    if (selectedLayers.length === 0) {
        alert("No layers selected. Select at least one layer to delete.");
        return;
    }
    var showConfirmation = lpGetBool("showDeleteConfirmation", true);
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
    var comp = getActiveComp();
    if (!comp) return;
    var selectedLayers = comp.selectedLayers;
    if (selectedLayers.length < 2) {
        alert("Select at least two layers to create a sequence.");
        return;
    }
    
    var reverseOrder = lpGetBool("reverseSequence", false);
    
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
    
    // Store layer information before modification — iterate in the SAME inPoint order used to
    // validate "already sequenced" so the confirmation matches what is applied (#9).
    var layerInfo = [];
    for (var i = 0; i < sortedLayers.length; i++) {
        var layer = sortedLayers[i];
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
    var comp = getActiveComp();
    if (!comp) return;
    var currentTime = comp.time;
    var layers = comp.layers;
    var selectedLayers = comp.selectedLayers;
    app.beginUndoGroup("Split Layers");
    var deleteSplitPart = lpGetBool("deleteSplitPart", false);
    var trimDirection = getSetting("trimDirection", "left");
    var additionalFrames = parseInt(getSetting("additionalFrames", "0"), 10);
    if (isNaN(additionalFrames)) additionalFrames = 0;
    
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
                    app.executeCommand(2158); // Split Layer (native menu command)
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
            app.executeCommand(2158); // Split Layer (native menu command)
        }
    }
    app.endUndoGroup();
}

function precomposeSelectedLayers() {
    var comp = getActiveComp();
    if (!comp) return;
    var selectedLayers = comp.selectedLayers;
    if (selectedLayers.length === 0) {
        alert("No layers selected. Please select at least one layer to precompose.");
        return;
    }
    app.beginUndoGroup("Precompose Layers");
    app.executeCommand(2071); // Native command for "Precompose Layers"
    app.endUndoGroup();
}

function duplicateLayer(includeEffects, includeExpressions, numberOfCopies) {
    var comp = getActiveComp();
    if (!comp) return;
    
    var selectedLayers = comp.selectedLayers;
    if (selectedLayers.length === 0) {
        alert("No layers selected. Please select at least one layer to duplicate.");
        return;
    }
    
    app.beginUndoGroup("Duplicate Layer(s)");
    
    // Store information about original layers
    var layerInfo = [];
    for (var i = 0; i < selectedLayers.length; i++) {
        layerInfo.push({
            layer: selectedLayers[i],
            index: selectedLayers[i].index
        });
    }
    
    // Sort by index (highest first) to maintain order when duplicating
    layerInfo.sort(function(a, b) {
        return a.index - b.index;
    });
    
    var allNewLayers = [];
    
    // For each original layer, create the specified number of copies
    for (var i = 0; i < layerInfo.length; i++) {
        var originalLayer = layerInfo[i].layer;
        
        // Deselect all layers first
        for (var j = 1; j <= comp.layers.length; j++) {
            comp.layers[j].selected = false;
        }
        
        // Select only the current original layer
        originalLayer.selected = true;
        
        // Create multiple copies
        for (var copyNum = 0; copyNum < numberOfCopies; copyNum++) {
            // Store IDs of existing layers before duplicating
            var existingLayerIds = {};
            for (var k = 1; k <= comp.layers.length; k++) {
                existingLayerIds[comp.layer(k).id] = true;
            }

            // Use native duplicate command
            app.executeCommand(2080); // Native command for "Duplicate"

            // The duplicated layer is the one whose id wasn't present before.
            var duplicatedLayer = null;
            for (var k = 1; k <= comp.layers.length; k++) {
                if (!existingLayerIds[comp.layer(k).id]) {
                    duplicatedLayer = comp.layer(k);
                    break;
                }
            }
            
            if (duplicatedLayer) {
                // If user doesn't want effects, remove them
                if (!includeEffects && duplicatedLayer.property("Effects")) {
                    var effects = duplicatedLayer.property("Effects");
                    // Remove from last to first; skip any effect that can't be removed (e.g. locked)
                    // without abandoning the remaining ones (#10).
                    for (var e = effects.numProperties; e >= 1; e--) {
                        try { effects.property(e).remove(); } catch (err) { /* skip locked effect */ }
                    }
                }
                
                // If user doesn't want expressions, remove them
                if (!includeExpressions) {
                    removeAllExpressions(duplicatedLayer);
                }
                
                // Store the layer ID (unique identifier)
                allNewLayers.push({
                    id: duplicatedLayer.id,
                    name: duplicatedLayer.name
                });
            }
        }
    }
    
    // Re-select only the newly created layers in a single pass.
    var newIds = {};
    for (var i = 0; i < allNewLayers.length; i++) {
        newIds[allNewLayers[i].id] = true;
    }
    for (var j = 1; j <= comp.layers.length; j++) {
        comp.layer(j).selected = newIds[comp.layer(j).id] === true;
    }

    app.endUndoGroup();
}

function removeAllExpressions(layer) {
    // Recursively remove expressions from all properties
    function removeExpressionsFromProperty(prop) {
        if (prop.canSetExpression && prop.expressionEnabled) {
            prop.expressionEnabled = false;
        }
        
        // Recursively check nested properties
        if (prop.numProperties !== undefined) {
            for (var i = 1; i <= prop.numProperties; i++) {
                removeExpressionsFromProperty(prop.property(i));
            }
        }
    }
    
    // Start from the layer level
    for (var i = 1; i <= layer.numProperties; i++) {
        removeExpressionsFromProperty(layer.property(i));
    }
}

function createNewCompositionNative() {
    app.executeCommand(2000); // Native command for "New Composition"
}

function addMarker(target) {
    var comp = getActiveComp();
    if (!comp) return;
    
    app.beginUndoGroup("Add Marker");
    
    var currentTime = comp.time;
    
    if (target === "comp") {
        // Add numbered marker to composition with gap detection
        var markerProperty = comp.markerProperty;
        var numMarkers = markerProperty.numKeys;
        
        // Collect all existing marker numbers
        var existingNumbers = [];
        for (var i = 1; i <= numMarkers; i++) {
            var markerValue = markerProperty.keyValue(i);
            var markerComment = markerValue.comment;
            
            // Only parse if the comment contains ONLY numbers (no additional text)
            // This regex checks if the entire string is a positive number
            if (/^\d+$/.test(markerComment)) {
                var num = parseInt(markerComment);
                if (num > 0) {
                    existingNumbers.push(num);
                }
            }
        }
        
        // Sort the numbers to find gaps
        existingNumbers.sort(function(a, b) { return a - b; });
        
        var markerNumber = 1;
        
        if (existingNumbers.length > 0) {
            // Find the first missing number in the sequence
            var foundGap = false;
            for (var i = 0; i < existingNumbers.length; i++) {
                var expectedNumber = i + 1;
                if (existingNumbers[i] !== expectedNumber) {
                    // Found a gap! Use this number
                    markerNumber = expectedNumber;
                    foundGap = true;
                    break;
                }
            }
            
            // If no gap found, use the next number after the highest
            if (!foundGap) {
                markerNumber = existingNumbers[existingNumbers.length - 1] + 1;
            }
        }
        
        var newMarker = new MarkerValue(markerNumber.toString());
        markerProperty.setValueAtTime(currentTime, newMarker);
    } else {
        // Add marker to selected layers (without numbering)
        // Layer target = the single selected layer (consistent with detect/move) (#5).
        var t = resolveMarkerTarget("layer", comp);
        if (t.error === "no-layer") { alert("No layer selected. Select one layer to add a marker."); app.endUndoGroup(); return; }
        if (t.error === "multi-layer") { alert("Multiple layers selected. Select only one layer to add a marker."); app.endUndoGroup(); return; }
        if (t.prop) t.prop.setValueAtTime(currentTime, new MarkerValue(""));
    }
    
    app.endUndoGroup();
}

function removeAllMarkers(target) {
    var comp = getActiveComp();
    if (!comp) return;
    
    app.beginUndoGroup("Remove All Markers");
    
    if (target === "comp") {
        // Remove all markers from composition
        var markerProperty = comp.markerProperty;
        var numMarkers = markerProperty.numKeys;
        
        if (numMarkers === 0) {
            alert("No markers found in the composition.");
            app.endUndoGroup();
            return;
        }
        
        // Remove markers in reverse order to avoid index shifting
        for (var i = numMarkers; i >= 1; i--) {
            markerProperty.removeKey(i);
        }
        
    } else {
        // Layer target = the single selected layer (consistent with detect/move) (#5).
        var t = resolveMarkerTarget("layer", comp);
        if (t.error === "no-layer") { alert("No layer selected. Select one layer to remove its markers."); app.endUndoGroup(); return; }
        if (t.error === "multi-layer") { alert("Multiple layers selected. Select only one layer to remove its markers."); app.endUndoGroup(); return; }
        var mp = t.prop;
        if (!mp || mp.numKeys === 0) {
            alert("No markers found on the selected layer.");
            app.endUndoGroup();
            return;
        }
        for (var j = mp.numKeys; j >= 1; j--) {
            mp.removeKey(j);
        }
    }
    
    app.endUndoGroup();
}

function openCompSettings() {
    var comp = getActiveComp();
    if (!comp) return;
    app.executeCommand(2007); // Native command for "Open Composition Settings"
}

function openLayerSettings() {
    var comp = getActiveComp();
    if (!comp) return false;
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
    var L = selectedLayers[0];

    // --- Layers WITHOUT a dedicated settings dialog → explain the specific reason. ---
    if (L instanceof TextLayer) {
        alert("Text layers don't have a settings dialog in After Effects.\n\nUse the Character and Paragraph panels instead.");
        return false;
    }
    if (L.matchName === "ADBE Vector Layer") {
        alert("Shape layers don't have a settings dialog in After Effects.\n\nUse the shape properties in the timeline panel instead.");
        return false;
    }
    if (L instanceof AVLayer && L.nullLayer) {
        alert("Null objects don't have a settings dialog in After Effects.\n\nAdjust them via the Transform properties in the timeline.");
        return false;
    }
    if (L instanceof AVLayer && L.source instanceof CompItem) {
        alert("Precomp layers don't have a settings dialog in After Effects.\n\nOpen the precomposition to edit its content, or use Composition Settings.");
        return false;
    }
    // Real footage (image/video/audio). Solids/Adjustment are FootageItems backed by a
    // SolidSource and DO have a dialog, so they are excluded here.
    if (L instanceof AVLayer && L.source instanceof FootageItem &&
        !(L.source.mainSource instanceof SolidSource)) {
        alert("Footage layers (images, videos, audio) don't have a settings dialog in After Effects.\n\nTo modify the source, use the Project panel or the Interpret Footage dialog.");
        return false;
    }

    // Solid / Adjustment (SolidSource), Light and Camera layers DO have a dedicated dialog.
    app.executeCommand(2021); // Native command for "Layer Settings" (Solid/Light/Camera Settings)
    return true;
}

function openFooterLink(customUrl) {
    var url = customUrl || "https://donyaep.vercel.app/";
    // Only allow http(s) URLs without shell-dangerous characters (prevents command injection).
    if (!/^https?:\/\/[^\s"'<>`|&;$()\\]+$/.test(url)) {
        alert("Invalid or unsafe URL.");
        return;
    }
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

// =========================================================================
// Marker tools (v4.0.0) — detect existing markers and relocate them
// =========================================================================

// Settings helper — centralizes the repeated app.settings boolean reads (#2).
function lpGetBool(key, def) {
    return app.settings.haveSetting("LayersPanePlus", key)
        ? app.settings.getSetting("LayersPanePlus", key) === "true"
        : def;
}

// Persistence bridge used by the panel (useSettings/useHost). Values stored as strings
// in the "LayersPanePlus" section — same storage lpGetBool reads.
function getSetting(key, fallback) {
    return app.settings.haveSetting("LayersPanePlus", key)
        ? app.settings.getSetting("LayersPanePlus", key)
        : fallback;
}

function saveSetting(key, value) {
    app.settings.saveSetting("LayersPanePlus", key, String(value));
    return "true";
}

// Clamps a time (seconds) into the valid composition range [0, duration] (#3).
function lpClampTime(t, comp) {
    if (t < 0) t = 0;
    if (t > comp.duration) t = comp.duration;
    return t;
}

// Resolves the marker target. "layer" requires EXACTLY one selected layer (#5).
// Returns { prop, layer } or { error: "no-layer" | "multi-layer" }.
function resolveMarkerTarget(target, comp) {
    if (target === "comp") return { prop: comp.markerProperty, layer: null };
    var sel = comp.selectedLayers;
    if (sel.length === 0) return { error: "no-layer" };
    if (sel.length > 1) return { error: "multi-layer" };
    return { prop: sel[0].property("Marker"), layer: sel[0] };
}

// Returns markers + comp duration/frameRate (+ layerId/layerName for layer target) as JSON.
function getMarkers(target) {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) return '{"error":"no-comp","duration":0,"frameRate":30,"markers":[]}';
    var base = '"duration":' + comp.duration + ',"frameRate":' + comp.frameRate;
    var t = resolveMarkerTarget(target, comp);
    if (t.error) return '{"error":"' + t.error + '",' + base + ',"markers":[]}';
    var mp = t.prop;
    if (!mp) return '{' + base + ',"markers":[]}';
    var meta = "";
    if (t.layer) {
        var nm = ("" + t.layer.name).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/[\r\n\t]/g, " ");
        meta = ',"layerId":' + t.layer.id + ',"layerName":"' + nm + '"';
    }
    var out = [];
    for (var i = 1; i <= mp.numKeys; i++) {
        var c = "";
        var cErr = false;
        // A failed read is flagged (commentError) instead of being hidden as an empty comment (#10).
        try { c = mp.keyValue(i).comment || ""; } catch (e) { cErr = true; }
        c = c.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/[\r\n\t]/g, " ");
        out.push('{"index":' + i + ',"time":' + mp.keyTime(i) + ',"comment":"' + c + '"' + (cErr ? ',"commentError":true' : '') + '}');
    }
    return '{' + base + meta + ',"markers":[' + out.join(",") + ']}';
}

// Validates the write target and, for layers, that the stable layer still matches
// expectedLayerId (prevents operating on a different layer than the one shown) (#4/#5).
// Returns the marker property, or null (alerting on the reason).
function resolveMarkerForWrite(target, comp, expectedLayerId) {
    var t = resolveMarkerTarget(target, comp);
    if (t.error === "no-layer") { alert("No layer selected. Select the layer whose markers you want to move."); return null; }
    if (t.error === "multi-layer") { alert("Multiple layers selected. Select only the layer whose markers you want to move."); return null; }
    if (t.layer && expectedLayerId != null && t.layer.id !== expectedLayerId) {
        alert("The selected layer changed. Re-open the markers tool for the current layer.");
        return null;
    }
    return t.prop;
}

// Moves a single marker (by index) to an absolute time (seconds), clamped to the comp range.
// Read (keyTime) and write (setValueAtTime) share the property's native time base, so the
// round-trip stays consistent for comp and layer markers regardless of startTime (#9).
function moveMarker(target, index, time, expectedLayerId) {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) { alert("No active composition."); return; }
    var mp = resolveMarkerForWrite(target, comp, expectedLayerId);
    if (!mp || index < 1 || index > mp.numKeys) return;
    time = lpClampTime(time, comp);
    app.beginUndoGroup("Move Marker");
    var val = mp.keyValue(index);
    mp.removeKey(index);
    mp.setValueAtTime(time, val);
    app.endUndoGroup();
}

// Moves all markers as a group so the earliest sits at the given time, preserving spacing and
// keeping the whole group within [0, duration] (#3).
function moveAllMarkers(target, time, expectedLayerId) {
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) { alert("No active composition."); return; }
    var mp = resolveMarkerForWrite(target, comp, expectedLayerId);
    if (!mp || mp.numKeys === 0) return;
    var items = [];
    var earliest = mp.keyTime(1);
    var latest = mp.keyTime(1);
    for (var i = 1; i <= mp.numKeys; i++) {
        var kt = mp.keyTime(i);
        if (kt < earliest) earliest = kt;
        if (kt > latest) latest = kt;
        items.push({ t: kt, v: mp.keyValue(i) });
    }
    var span = latest - earliest;
    var targetStart = lpClampTime(time, comp);
    if (targetStart + span > comp.duration) targetStart = Math.max(0, comp.duration - span);
    var delta = targetStart - earliest;
    app.beginUndoGroup("Move All Markers");
    for (var i = mp.numKeys; i >= 1; i--) mp.removeKey(i);
    for (var j = 0; j < items.length; j++) mp.setValueAtTime(items[j].t + delta, items[j].v);
    app.endUndoGroup();
}
