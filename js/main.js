(function() {
    "use strict";
    var csInterface = new CSInterface();

    // Load JSX file with extended logic for After Effects
    function loadJSX() {
        var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/jsx/scripts.jsx";
        extensionRoot = extensionRoot.replace(/\\/g, "/");
        csInterface.evalScript('$.evalFile("' + extensionRoot + '")');
    }

    function initTabs() {
        var tabs = document.querySelectorAll('.tab-bar .tab');
        tabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                tabs.forEach(function(t) {
                    t.classList.remove('active');
                });
                var sections = document.querySelectorAll('.section');
                sections.forEach(function(section) {
                    section.classList.remove('active');
                });
                tab.classList.add('active');
                var sectionId = "section-" + tab.getAttribute('data-section');
                var section = document.getElementById(sectionId);
                if (section) {
                    section.classList.add('active');
                }
            });
        });
    }

    function initUI() {
        // Layer Creation Buttons
        document.getElementById("createTextBtn").addEventListener("click", function () {
            var textInput = document.getElementById("textLayerInput");
            var clearButton = document.querySelector(".clear-input");
            var customText = textInput ? textInput.value.trim() : "";
            csInterface.evalScript('createTextLayer("' + customText + '")');
            if (textInput) {
                textInput.value = "";
                if (clearButton) {
                    clearButton.classList.remove('visible');
                }
            }
        });
        document.getElementById("createSolidBtn").addEventListener("click", function () {
            csInterface.evalScript('createSolidLayer()');
        });
        document.getElementById("createLightBtn").addEventListener("click", function () {
            csInterface.evalScript('createLight()');
        });
        document.getElementById("createCameraBtn").addEventListener("click", function () {
            csInterface.evalScript('createCamera()');
        });
        document.getElementById("createNullBtn").addEventListener("click", function () {
            csInterface.evalScript('createNullObject()');
        });
        document.getElementById("createShapeBtn").addEventListener("click", function () {
            csInterface.evalScript('createShapeLayer()');
        });
        document.getElementById("createAdjustmentBtn").addEventListener("click", function () {
            csInterface.evalScript('createAdjustmentLayer()');
        });

        // Editing Buttons
        document.getElementById("deleteLayerBtn").addEventListener("click", function () {
            csInterface.evalScript('deleteLayer()');
        });
        document.getElementById("createSequenceBtn").addEventListener("click", function () {
            csInterface.evalScript('createLayerSequence()');
        });
        document.getElementById("splitLayerBtn").addEventListener("click", function () {            
            csInterface.evalScript('splitLayersAtCurrentTime()');
        });
        document.getElementById("precomposeBtn").addEventListener("click", function () {
            csInterface.evalScript('precomposeSelectedLayers()');
        });
        document.getElementById("createCompBtn").addEventListener("click", function () {
            csInterface.evalScript('createNewCompositionNative()');
        });
        document.getElementById("compSettingsBtn").addEventListener("click", function () {
            csInterface.evalScript('openCompSettings()');
        });
        document.getElementById("layerSettingsBtn").addEventListener("click", function () {
            csInterface.evalScript('openLayerSettings()');
        });

        // Help and Settings Modals
        document.getElementById("helpBtn").addEventListener("click", function () {
            document.getElementById("helpModal").classList.add("visible");
        });
        document.getElementById("openSettingsBtn").addEventListener("click", function () {
            document.getElementById("settingsModal").classList.add("visible");
            
            // Load current settings
            csInterface.evalScript('app.settings.haveSetting("LayersPanePlus", "autoParentLayers") ? app.settings.getSetting("LayersPanePlus", "autoParentLayers") === "true" : false', function(result) {
                document.getElementById("autoParentLayersCheckbox").checked = (result === "true");
            });
            
            csInterface.evalScript('app.settings.haveSetting("LayersPanePlus", "matchNewLayerDuration") ? app.settings.getSetting("LayersPanePlus", "matchNewLayerDuration") === "true" : false', function(result) {
                document.getElementById("matchDurationCheckbox").checked = (result === "true");
            });
        });
        
        // Modal Event Handlers
        document.querySelector(".close-modal").addEventListener("click", function() {
            document.getElementById("settingsModal").classList.remove("visible");
        });
        
        document.getElementById("settingsModal").addEventListener("click", function(e) {
            if (e.target === this) {
                this.classList.remove("visible");
            }
        });
        
        document.getElementById("saveSettingsBtn").addEventListener("click", function() {
            var autoParentLayers = document.getElementById("autoParentLayersCheckbox").checked;
            var matchDuration = document.getElementById("matchDurationCheckbox").checked;
            
            csInterface.evalScript('app.settings.saveSetting("LayersPanePlus", "autoParentLayers", ' + autoParentLayers + ')');
            csInterface.evalScript('app.settings.saveSetting("LayersPanePlus", "matchNewLayerDuration", ' + matchDuration + ')');
            
            document.getElementById("settingsModal").classList.remove("visible");
        });
        
        document.getElementById("cancelSettingsBtn").addEventListener("click", function() {
            document.getElementById("settingsModal").classList.remove("visible");
        });
        
        // Delete Confirmation Settings
        var deleteConfirmCheckbox = document.getElementById("deleteConfirmCheckbox");
        
        csInterface.evalScript('app.settings.haveSetting("LayersPanePlus", "showDeleteConfirmation") ? app.settings.getSetting("LayersPanePlus", "showDeleteConfirmation") === "true" : true', function(result) {
            deleteConfirmCheckbox.checked = (result === "true");
        });
        
        deleteConfirmCheckbox.addEventListener("change", function() {
            csInterface.evalScript('app.settings.saveSetting("LayersPanePlus", "showDeleteConfirmation", ' + deleteConfirmCheckbox.checked + ')');
        });
        
        // Split Options Settings
        var deleteSplitCheckbox = document.getElementById("deleteSplitCheckbox");
        var trimDirectionContainer = document.getElementById("trimDirectionContainer");
        var splitOptions = document.getElementById("splitOptions");
        
        csInterface.evalScript('app.settings.haveSetting("LayersPanePlus", "deleteSplitPart") ? app.settings.getSetting("LayersPanePlus", "deleteSplitPart") === "true" : false', function(result) {
            deleteSplitCheckbox.checked = (result === "true");
            if (deleteSplitCheckbox.checked) {
                trimDirectionContainer.classList.remove("hidden");
                splitOptions.classList.add("with-radio");
                splitOptions.classList.remove("single-option");
            } else {
                trimDirectionContainer.classList.add("hidden");
                splitOptions.classList.remove("with-radio");
                splitOptions.classList.add("single-option");
            }
        });
        
        deleteSplitCheckbox.addEventListener("change", function() {
            csInterface.evalScript('app.settings.saveSetting("LayersPanePlus", "deleteSplitPart", ' + deleteSplitCheckbox.checked + ')');
            
            if (this.checked) {
                trimDirectionContainer.classList.remove("hidden");
                splitOptions.classList.add("with-radio");
                splitOptions.classList.remove("single-option");
            } else {
                trimDirectionContainer.classList.add("hidden");
                splitOptions.classList.remove("with-radio");
                splitOptions.classList.add("single-option");
            }
        });
        
        // Trim Direction Settings
        var trimLeftRadio = document.getElementById("trimLeftRadio");
        var trimRightRadio = document.getElementById("trimRightRadio");
        
        csInterface.evalScript('app.settings.haveSetting("LayersPanePlus", "trimDirection") ? app.settings.getSetting("LayersPanePlus", "trimDirection") : "left"', function(result) {
            if (result === "right") {
                trimRightRadio.checked = true;
            } else {
                trimLeftRadio.checked = true;
            }
        });
        
        trimLeftRadio.addEventListener("change", function() {
            if (this.checked) {
                csInterface.evalScript('app.settings.saveSetting("LayersPanePlus", "trimDirection", "left")');
            }
        });
        
        trimRightRadio.addEventListener("change", function() {
            if (this.checked) {
                csInterface.evalScript('app.settings.saveSetting("LayersPanePlus", "trimDirection", "right")');
            }
        });
        
        // Toggle Options Buttons
        var toggleButtons = document.querySelectorAll('.toggle-options');
        toggleButtons.forEach(function(button) {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                
                var targetId = this.getAttribute('data-target');
                var optionsContainer = document.getElementById(targetId);
                
                this.classList.toggle('active');
                optionsContainer.classList.toggle('visible');
            });
        });
        
        initTabs();
        
        // Modal Close Handlers
        document.querySelectorAll(".close-modal").forEach(function(button) {
            button.addEventListener("click", function() {
                var modal = this.closest(".modal");
                if (modal) {
                    modal.classList.remove("visible");
                }
            });
        });
        
        document.querySelectorAll(".modal").forEach(function(modal) {
            modal.addEventListener("click", function(e) {
                if (e.target === this) {
                    this.classList.remove("visible");
                }
            });
        });
        
        document.getElementById("closeHelpBtn").addEventListener("click", function() {
            document.getElementById("helpModal").classList.remove("visible");
        });
        
        // Help Modal Buttons
        document.getElementById("helpCopyBtn").addEventListener("click", function() {
            var linkText = document.getElementById("helpLinkText");
            var copyFeedback = document.querySelector(".copy-feedback");
            
            linkText.select();
            document.execCommand("copy");
            
            copyFeedback.classList.add("visible");
            
            setTimeout(function() {
                copyFeedback.classList.remove("visible");
                window.getSelection().removeAllRanges();
            }, 2000);
        });
        
        document.getElementById("helpOpenBtn").addEventListener("click", function() {
            var url = "https://" + document.getElementById("helpLinkText").value;
            csInterface.evalScript('openFooterLink("' + url + '")');
        });

        // Text Input Clear Button
        var textInput = document.getElementById("textLayerInput");
        var clearButton = document.querySelector(".clear-input");
        
        if (clearButton && textInput) {
            clearButton.classList.toggle('visible', textInput.value.length > 0);
            
            clearButton.addEventListener("click", function() {
                textInput.value = "";
                textInput.focus();
                clearButton.classList.remove('visible');
            });
            
            textInput.addEventListener("input", function() {
                clearButton.classList.toggle('visible', this.value.length > 0);
            });
        }

        // Additional Frames Settings
        var additionalFramesContainer = document.getElementById("additionalFramesContainer");
        var additionalFramesInput = document.getElementById("additionalFramesInput");

        csInterface.evalScript('app.settings.haveSetting("LayersPanePlus", "additionalFrames") ? app.settings.getSetting("LayersPanePlus", "additionalFrames") : "0"', function(result) {
            var value = Math.max(0, parseInt(result) || 0);
            additionalFramesInput.value = value;
        });

        additionalFramesInput.addEventListener("input", function() {
            // If value is negative, empty, or NaN, set it to 0
            if (this.value < 0 || this.value === "" || isNaN(this.value)) {
                this.value = 0;
            }
        });

        additionalFramesInput.addEventListener("change", function() {
            var value = Math.max(0, parseInt(this.value) || 0);
            this.value = value;
            csInterface.evalScript('app.settings.saveSetting("LayersPanePlus", "additionalFrames", ' + value + ')');
        });

        deleteSplitCheckbox.addEventListener("change", function() {
            csInterface.evalScript('app.settings.saveSetting("LayersPanePlus", "deleteSplitPart", ' + this.checked + ')');
            
            if (this.checked) {
                trimDirectionContainer.classList.remove("hidden");
                additionalFramesContainer.classList.remove("hidden");
                splitOptions.classList.add("with-radio");
                splitOptions.classList.remove("single-option");
            } else {
                trimDirectionContainer.classList.add("hidden");
                additionalFramesContainer.classList.add("hidden");
                splitOptions.classList.remove("with-radio");
                splitOptions.classList.add("single-option");
            }
        });

        csInterface.evalScript('app.settings.haveSetting("LayersPanePlus", "deleteSplitPart") ? app.settings.getSetting("LayersPanePlus", "deleteSplitPart") === "true" : false', function(result) {
            deleteSplitCheckbox.checked = (result === "true");
            if (deleteSplitCheckbox.checked) {
                trimDirectionContainer.classList.remove("hidden");
                additionalFramesContainer.classList.remove("hidden");
                splitOptions.classList.add("with-radio");
                splitOptions.classList.remove("single-option");
            } else {
                trimDirectionContainer.classList.add("hidden");
                additionalFramesContainer.classList.add("hidden");
                splitOptions.classList.remove("with-radio");
                splitOptions.classList.add("single-option");
            }
        });

        // Frame Counter Buttons
        var decrementFramesBtn = document.getElementById("decrementFramesBtn");
        var incrementFramesBtn = document.getElementById("incrementFramesBtn");

        if (decrementFramesBtn && incrementFramesBtn) {
            decrementFramesBtn.addEventListener("click", function() {
                var currentValue = parseInt(additionalFramesInput.value) || 0;
                if (currentValue > 0) {
                    additionalFramesInput.value = currentValue - 1;
                    var event = new Event('change');
                    additionalFramesInput.dispatchEvent(event);
                }
            });
            
            incrementFramesBtn.addEventListener("click", function() {
                var currentValue = parseInt(additionalFramesInput.value) || 0;
                if (currentValue < 100) {
                    additionalFramesInput.value = currentValue + 1;
                    var event = new Event('change');
                    additionalFramesInput.dispatchEvent(event);
                }
            });
        }

        // Sequence Options Settings
        var reverseSequenceCheckbox = document.getElementById("reverseSequenceCheckbox");
        
        csInterface.evalScript('app.settings.haveSetting("LayersPanePlus", "reverseSequence") ? app.settings.getSetting("LayersPanePlus", "reverseSequence") === "true" : false', function(result) {
            reverseSequenceCheckbox.checked = (result === "true");
        });
        
        reverseSequenceCheckbox.addEventListener("change", function() {
            csInterface.evalScript('app.settings.saveSetting("LayersPanePlus", "reverseSequence", ' + reverseSequenceCheckbox.checked + ')');
        });
    }

    function initMenu() {
        var menuXML =
            '<Menu>' +
                '<MenuItem Id="separator1" Label="---" Enabled="false"/>' +
                '<MenuItem Id="refreshPanel" Label="Refresh Layers Pane Plus v3.1.0" Enabled="true" Checked="false"/>' +
                '<MenuItem Id="separator2" Label="---" Enabled="false"/>' +
                '<MenuItem Id="documentationLink" Label="Open Documentation" Enabled="true" Checked="false"/>' +
            '</Menu>';

        csInterface.setPanelFlyoutMenu(menuXML);
        csInterface.addEventListener("com.adobe.csxs.events.flyoutMenuClicked", menuClickedHandler);
    }

    function menuClickedHandler(event) {
        if (event.data.menuId === "refreshPanel") {
            location.reload();
        } else if (event.data.menuId === "documentationLink") {
            csInterface.evalScript('openFooterLink("https://scriptsbydonyaep.vercel.app/extension/layers-pane-plus")');
        }
    }

    document.addEventListener("DOMContentLoaded", function() {
        loadJSX();
        initUI();
        initMenu();
        
        var footerLink = document.querySelector('.footer-link');
        if (footerLink) {
            footerLink.addEventListener("click", function() {
                csInterface.evalScript('openFooterLink()');
            });
        }
    });
})(); 