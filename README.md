# Layers Pane Plus by dony.

[![English](https://img.shields.io/badge/Language-English-blue.svg)](README.md)
[![Español](https://img.shields.io/badge/Idioma-Español-red.svg)](README_ES.md)

> **[Leer en Español](README_ES.md) | Read in English**

## Description
Layers Pane Plus is an advanced extension for Adobe After Effects that provides extended functionality for layer creation and management. Previously distributed as a single script, Layers Pane Plus has evolved into a comprehensive extension that offers a more robust, modern, and integrated After Effects experience.

## Current Version
**v3.1.0** - Latest update: Added reverse sequence functionality, enhanced multiple layer support for native dialog layers, improved Layer Settings validation, and updated documentation links.

## Installation
1. Locate the Adobe After Effects CEP Extensions folder:
   ```
   C:\Program Files (x86)\Common Files\Adobe\CEP\extensions
   ```
2. Place the entire extension folder (Layers Pane Plus) in this directory.
3. Launch After Effects and access the extension via **Window > Extensions > Layers Pane Plus**.

## Main Features
- Quick creation of various layer types: Text, Solid, Null Object, Shape, Camera, Light, Adjustment
- Deletion of selected layers with confirmation
- Layer sequencing based on selection order with reverse option
- Splitting of layers at the current time indicator with directional trim options
- Precomposing selected layers using the native After Effects dialog
- Creation of new compositions through the native After Effects dialog
- Auto Parent Layers (Compatible with all layer types)
- Match Layer Duration (Compatible with all layer types)
- Settings panel for customizing extension behavior
- User-friendly interface with icon buttons
- Dockable panel in the workspace
- Responsive and resizable UI

## Settings Options
- Auto Parent Layers: Automatically parent selected layers to new layers
- Match Layer Duration: New layers match the duration of selected layers
- Auto Delete Split Parts: Option to automatically delete split parts
- Trim Direction: Choose whether to keep the left or right side when splitting with auto delete enabled
- Show Delete Confirmation: Toggle confirmation dialog for layer deletion
- Reverse Sequence Order: Create layer sequences in reverse selection order

## Usage
1. Open Adobe After Effects
2. Go to **Window > Extensions > Layers Pane Plus**
3. Use the buttons to create different types of layers or perform actions
4. Access the Settings panel to customize script behavior
5. For layer sequencing:
   - Select layers in the desired order
   - Toggle "Reverse Order" option if needed
   - Click the sequence button
   - The extension will detect if layers are already sequenced and ask for confirmation
6. For creating layers with parenting or duration matching:
   - Enable desired options in Settings panel
   - Select target layer(s) - multiple layers supported for all layer types
   - Create new layer of any type (Text, Shape, Null, Solid, Light, Camera, or Adjustment)
7. For splitting layers:
   - Position the time indicator
   - Select specific layers or leave unselected for all layers
   - Click the split button
   - When "Auto Delete Split" is enabled, use the "Trim Direction" radio buttons to choose whether to keep the left or right side of the split
8. For precomposing:
   - Select layers to precompose
   - Click the precompose button
   - Use the native After Effects dialog
9. For Layer Settings:
   - Select only ONE layer (extension will warn if multiple layers are selected)
   - Click Layer Settings button

## Version History

### v3.1.0 - August 15, 2025
- **New:** Added "Reverse Order" option for layer sequencing - create sequences in reverse selection order
- **New:** Intelligent sequence detection - extension now detects if layers are already sequenced and asks for confirmation before re-sequencing
- **Enhanced:** Full multiple layer support for Solid, Light, and Camera layers with native dialogs - Auto Parent and Match Duration now work correctly with multiple selected layers
- **Enhanced:** Improved Layer Settings validation - now shows specific warning when multiple layers are selected, requiring only one layer selection
- **Updated:** Documentation link updated to new location: https://scriptsbydonyaep.vercel.app/extension/layers-pane-plus
- **Updated:** Material Symbols icons now use weight 200 for improved visual consistency
- **Fixed:** Sequence function no longer causes visual artifacts (dotted lines) when re-sequencing layers
- **Fixed:** Eliminated code redundancy by removing unused functions and cleaning up comments

### v3.0.1 - May 30, 2025
- Added local loading of the Poppins font from the `fonts/` folder.
- Moved the "Comp Settings" and "Layer Settings" buttons to the "Edit" tab.
- Introduced a flyout menu with new options for the panel.
- Improved compatibility and minor fixes in the initialization of the contextual menu.
- **New:** Added a toggle option for the "Text" button that reveals a text input field. You can now enter custom text for the new text layer; if left empty, a default text layer is created as before.
- **New:** Added an "Additional frames" option for the Split button that appears when the "Auto delete split" checkbox is activated. This feature includes increment/decrement buttons and validation to ensure only positive values can be entered.
- **Fixed:** Added a layer type check for the "Layer Settings" button that displays helpful messages when used with Text or Shape layers, which don't have native settings dialogs in After Effects. 

### v3.0.0 - 25 February 2025
- **Complete conversion to CEP Extension:** Now, this script is delivered as a CEP extension with an updated user interface and improved workflow.
- Overhauled user interface with improved responsiveness.
- Enhanced performance and extended functionality.
- **Added compatibility for Auto Parent and Match Duration with all layer types:** Now Solid, Light, and Camera layers fully support these features.
- **Special handling for Light layers:** Light layers now properly affect parented layers without position compensation.
- **Added directional trim options for split function:** Choose whether to keep the left or right side when splitting with auto delete enabled.
- Added visual feedback when copying links with a white check icon.
- Improved tooltip system with descriptive titles for all interactive elements.
- Reorganized options into collapsible panels for a cleaner interface.
- Added responsive design for different screen sizes.
- **Migrated Help and Settings panels from JSX to HTML modals** for better integration and user experience.
- Moved checkbox options from JSX to HTML interface for direct interaction without script reloading.
- Implemented modern UI components including custom checkboxes and toggle buttons.
- Added text selection feedback when copying links for improved user experience.
- This release represents a significant evolution from the previous script-based approach.

### v2.1.0
- Added new button to open native Composition Settings dialog
- Added new button to open native Layer Properties dialog
- Added support for Auto Parent and Match Duration with Adjustment layers
- Improved help panel interface
- Simplified panel titles for better visualization
- Added copy and open link buttons in contact panel
- Optimized contact information presentation
- Updated documentation and help texts
- Enhanced overall user experience

### v2.0.1
- Embedded all icons directly into the script file
- Removed dependency on external asset folder
- Improved script stability and compatibility
- Updated version information in UI elements

### v2.0
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
For help or to provide feedback, please contact me at:
[https://linktr.ee/Dony.ae](https://linktr.ee/Dony.ae)

Enjoy the extension and happy creating!