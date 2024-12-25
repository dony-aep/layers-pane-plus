# Layers Pane Plus by dony.

## Description
Layers Pane Plus is an advanced script for Adobe After Effects that provides extended functionality for layer creation and management. Designed to enhance workflow, this script offers an intuitive user interface with icon buttons for various layer operations.

## Current Version
**v2.0** - Major update with new features and enhanced functionality.

## Installation
1. Locate the After Effects ScriptUI Panels folder:
   ```
   C:\Program Files\Adobe\Adobe After Effects [Version]\Support Files\Scripts\ScriptUI Panels
   ```
2. Place the script file (`Layers Pane Plus.jsx`) in this folder.
3. Ensure that the `LpPlusAssets` folder (containing the icons) is in the same location as the script.

## Main Features
- Quick creation of various layer types: Text, Solid, Null Object, Shape, Camera, Light, Adjustment
- Deletion of selected layers with confirmation option
- Creation of layer sequences based on selection order
- Splitting of layers at the current time indicator
- Precompose selected layers using the native After Effects dialog
- Creation of new compositions using the native After Effects dialog
- Auto Parent Layers (Only for Text, Shape and Null layers)
- Match Layer Duration (Only for Text, Shape and Null layers)
- Settings panel for customizing script behavior
- User-friendly interface with icon buttons
- Dockable panel in the workspace
- Resizable window with adaptive button alignment

## Settings Options
- Auto Parent Layers: Automatically parent selected layers to new layers
- Match Layer Duration: New layers match the duration of selected layers
- Auto Delete Split Parts: Option to automatically delete split parts
- Show Delete Confirmation: Toggle confirmation dialog for layer deletion

Note about limitations:
The Auto Parent Layers and Match Layer Duration options only work with Text, Shape, and Null layers. These features are not available for Solid, Light, Camera, and Adjustment layer types due to limitations in After Effects' native implementation for these layer types.

## Usage
1. Open Adobe After Effects
2. Go to Window > Layers Pane Plus
3. Use the buttons to create different types of layers or perform actions
4. Access the Settings panel to customize script behavior
5. For layer sequencing:
   - Select layers in the desired order
   - Click the sequence button
   - The first selected layer will maintain its position, and subsequent layers will be placed one after another
6. For creating layers with parenting or duration matching:
   - Enable desired options in Settings panel
   - Select target layer(s)
   - Create new Text, Shape, or Null layer
7. For splitting layers:
   - Position the time indicator
   - Select specific layers or leave unselected for all layers
   - Click the split button
8. For precomposing:
   - Select layers to precompose
   - Click the precompose button
   - Use the native After Effects dialog

## Version History

### v2.0 (Current Version)
- Added Settings panel for script customization
- Implemented Auto Parent Layers feature
- Added Match Layer Duration functionality
- Added Light Layer creation
- Added Auto Delete Split Parts option
- Added Delete Confirmation dialog option
- Improved UI responsiveness and layout
- Enhanced documentation and help system

### v1.7
- Renamed the layer splitting function for better clarity
- Enhanced the layer splitting function to handle specific or all layers based on selection
- Added a new button for quickly precomposing selected layers

### v1.6.5
- Restored alert for active composition in the `splitAllLayers` function
- Updated layer splitting functionality
- Fixed command ID for creating new composition
- Updated help text for the layer splitting button

### v1.6.4
- Adjusted the `splitAllLayers` function to split layers without individual notifications
- Updated version text in the user interface
- Updated help documentation

### v1.6.3
- Added button to split layers
- Added button to create new composition
- Improved help documentation

### v1.6.2
- Improved text layer creation
- Fixed error handling issues in layer naming
- Improved compatibility with various After Effects versions

### v1.6.1
- Updated layer creation to use native After Effects commands
- Improved error handling and user feedback

### v1.6
- Improved solid layer creation using native dialog
- Implemented unique naming system for layers

### v1.5
- Rewritten layer sequencing function

### v1.4
- Updated sequencing function to respect layer in and out points

### v1.3
- Added function to create layer sequences

### v1.2
- Added icons to the user interface
- Added buttons for deleting layers and help

### v1.1
- Added validations for each button
- Made panel dockable in the workspace
- Added ability to adjust window size

### v1.0
- Initial release with basic layer creation functions

## Support
If you need help or want to provide feedback, you can contact me here:
[https://linktr.ee/Dony.ae](https://linktr.ee/Dony.ae)

Enjoy this script and happy creating! :>