export declare class DialogBuilder {
    #private;
    /**
     * Sets the default color of the dialog
     * @param {string} color
     * @returns {DialogBuilder}
     */
    defaultColor(color?: string): DialogBuilder;
    /**
     * Adds a spacer for the dialog
     * @param {string} type Spacer type, 'big' or 'small'
     * @returns {DialogBuilder}
     */
    addSpacer(type: string): DialogBuilder;
    /**
     * Adds a label
     * @param {string} text Title of the label
     * @returns {DialogBuilder}
     */
    addLabel(text: string): DialogBuilder;
    /**
     * Adds a label with an icon
     * @param {string} text Title of the label
     * @param {string} titleid The icon to add to the label
     * @param {string | number} type The type of the label, 'big' or 'small'
     * @returns {DialogBuilder}
     */
    addLabelWithIcon(text: string, titleid: string | number, type: string): DialogBuilder;
    embed<K, V>(key: K, val: V): this;
    /**
     * Adds a button
     * @param {string} name The name of the button
     * @param {string} text The text in the button
     * @returns {DialogBuilder}
     */
    addButton(name: string, text: string): DialogBuilder;
    /**
     * Adds a button
     * @param {string} name The name of the button
     * @param {string} title The text in the button
     * @param {string} image The rttex image of the button
     * @param {string} description The description of item being purchased
     * @param {object} imagepos The position of the image
     * @param {string | number} cost The cost of the item
     * @returns {DialogBuilder}
     */
    addStoreButton(name: string, title: string, description: string, image?: string, imagepos?: {
        x: number;
        y: number;
    }, cost?: string | number): DialogBuilder;
    /**
     * Adds a button with icon.
     * @param {string | number} name The name of the button
     * @param {string | number} itemID The button icon using itemID
     * @param {string} text The text in the button
     * @returns {DialogBuilder}
     */
    addButtonWithIcon(name: string | number, itemID: string | number, text: string, frame?: string, count?: number): DialogBuilder;
    /**
     * Adds a custom butto with rttex icon on it.
     * @param name The name of the button
     * @param imageLocation The rttex location
     * @param image_size The image size
     * @param btnWidth The button width
     * @returns {DialogBuilder}
     */
    addCustomButton(name: string | number, imageLocation: string, image_size?: {
        width: number;
        height: number;
    }, btnWidth?: number): DialogBuilder;
    /**
     * Adds a custom break.
     * @returns {DialogBuilder}
     */
    addCustomBreak(): DialogBuilder;
    /**
     * Adds a checkbox
     * @param {string} name The name of the checkbox
     * @param {string} string The text in the checkbox
     * @param {string} type The type of the checkbox 'select' or 'not_selected'
     * @returns {DialogBuilder}
     */
    addCheckbox(name: string, string: string, type: string): DialogBuilder;
    /**
     * Adds a text box
     * @param {string} str The str to add
     * @returns {DialogBuilder}
     */
    addTextBox(str: string): DialogBuilder;
    /**
     * Adds a small text
     * @param {string} str The text to add
     * @returns {DialogBuilder}
     */
    addSmallText(str: string): DialogBuilder;
    /**
     * Adds an input box
     * @param {string} name The id of the input box
     * @param {string} text The text beside it
     * @param {string | number} cont Default content?
     * @param {string | number} size The max size of the box
     * @returns {DialogBuilder}
     */
    addInputBox(name?: string, text?: string, cont?: string | number, size?: string | number): DialogBuilder;
    /**
     * Adds quick exit button
     * @returns {DialogBuilder}
     */
    addQuickExit(): DialogBuilder;
    /**
     * Adds buttons at the end of the dialog
     * @param {string} name The id of the dialog
     * @param {string} nvm The value of the button when you want it closed/cancelled.
     * @param {string} accept The value of the button when you want it to add a value to the 'dialog_return' packet
     * @returns {DialogBuilder}
     */
    endDialog(name: string, nvm: string, accept: string): DialogBuilder;
    /**
     * Adds a raw dialog, useful if the function for that specific dialog would not be here
     * @param {string} str The dialog to add
     * @return {DialogBuilder}
     */
    raw(str: string): DialogBuilder;
    /**
     * Returns the created string
     * @returns {string}
     */
    str(): string;
    /**
     * Removes the value of the str to return
     * @return {DialogBuilder}
     */
    reconstruct(): DialogBuilder;
}
