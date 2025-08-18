# Changelog

All notable changes to Layers Pane Plus extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.1.0] - 2025-08-15

### Added
- "Reverse Order" option for layer sequencing - create sequences in reverse selection order
- Intelligent sequence detection - extension now detects if layers are already sequenced and asks for confirmation before re-sequencing

### Enhanced
- Full multiple layer support for Solid, Light, and Camera layers with native dialogs - Auto Parent and Match Duration now work correctly with multiple selected layers
- Improved Layer Settings validation - now shows specific warning when multiple layers are selected, requiring only one layer selection

### Updated
- Documentation link updated to new location: https://scriptsbydonyaep.vercel.app/extension/layers-pane-plus
- Material Symbols icons now use weight 200 for improved visual consistency

### Fixed
- Sequence function no longer causes visual artifacts (dotted lines) when re-sequencing layers
- Eliminated code redundancy by removing unused functions and cleaning up comments

## [3.0.1] - 2025-05-30

### Added
- Local loading of the Poppins font from the `fonts/` folder
- Toggle option for the "Text" button that reveals a text input field. You can now enter custom text for the new text layer; if left empty, a default text layer is created as before
- "Additional frames" option for the Split button that appears when the "Auto delete split" checkbox is activated. This feature includes increment/decrement buttons and validation to ensure only positive values can be entered
- Flyout menu with new options for the panel

### Changed
- Moved the "Comp Settings" and "Layer Settings" buttons to the "Edit" tab

### Fixed
- Added a layer type check for the "Layer Settings" button that displays helpful messages when used with Text or Shape layers, which don't have native settings dialogs in After Effects
- Improved compatibility and minor fixes in the initialization of the contextual menu

## [3.0.0] - 2025-02-25

### Added
- **Complete conversion to CEP Extension:** Now, this script is delivered as a CEP extension with an updated user interface and improved workflow
- **Compatibility for Auto Parent and Match Duration with all layer types:** Now Solid, Light, and Camera layers fully support these features
- **Special handling for Light layers:** Light layers now properly affect parented layers without position compensation
- **Directional trim options for split function:** Choose whether to keep the left or right side when splitting with auto delete enabled
- Visual feedback when copying links with a white check icon
- Responsive design for different screen sizes
- Modern UI components including custom checkboxes and toggle buttons
- Text selection feedback when copying links for improved user experience

### Changed
- Overhauled user interface with improved responsiveness
- Enhanced performance and extended functionality
- **Migrated Help and Settings panels from JSX to HTML modals** for better integration and user experience
- Moved checkbox options from JSX to HTML interface for direct interaction without script reloading
- Reorganized options into collapsible panels for a cleaner interface

### Improved
- Tooltip system with descriptive titles for all interactive elements

### Note
This release represents a significant evolution from the previous script-based approach.

## [2.1.0]

### Added
- New button to open native Composition Settings dialog
- New button to open native Layer Properties dialog
- Support for Auto Parent and Match Duration with Adjustment layers
- Copy and open link buttons in contact panel

### Changed
- Improved help panel interface
- Simplified panel titles for better visualization
- Optimized contact information presentation

### Updated
- Documentation and help texts
- Enhanced overall user experience

## [2.0.1]

### Added
- Embedded all icons directly into the script file

### Removed
- Dependency on external asset folder

### Improved
- Script stability and compatibility
- Updated version information in UI elements

## [2.0]

### Added
- Settings panel for script customization
- Auto Parent Layers feature
- Match Layer Duration functionality
- Light Layer creation
- Auto Delete Split Parts option
- Delete Confirmation dialog option

### Improved
- UI responsiveness and layout
- Documentation and help system

## [1.7]

### Added
- New button for quickly precomposing selected layers

### Changed
- Renamed the layer splitting function for better clarity
- Enhanced the layer splitting function to handle specific or all layers based on selection

## [1.6.5]

### Fixed
- Restored alert for active composition in the `splitAllLayers` function
- Fixed command ID for creating new composition

### Updated
- Layer splitting functionality
- Help text for the layer splitting button

## [1.6.4]

### Changed
- Adjusted the `splitAllLayers` function to split layers without individual notifications

### Updated
- Version text in the user interface
- Help documentation

## [1.6.3]

### Added
- Button to split layers
- Button to create new composition

### Improved
- Help documentation

## [1.6.2]

### Improved
- Text layer creation
- Compatibility with various After Effects versions

### Fixed
- Error handling issues in layer naming

## [1.6.1]

### Updated
- Layer creation to use native After Effects commands

### Improved
- Error handling and user feedback

## [1.6]

### Improved
- Solid layer creation using native dialog
- Implemented unique naming system for layers

## [1.5]

### Changed
- Rewritten layer sequencing function

## [1.4]

### Updated
- Sequencing function to respect layer in and out points

## [1.3]

### Added
- Function to create layer sequences

## [1.2]

### Added
- Icons to the user interface
- Buttons for deleting layers and help

## [1.1]

### Added
- Validations for each button
- Made panel dockable in the workspace
- Ability to adjust window size

## [1.0]

### Added
- Initial release with basic layer creation functions
