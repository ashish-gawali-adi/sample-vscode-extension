/**
 * Copyright (c) 2023 Analog Devices, Inc. All Rights Reserved.
 * This software is proprietary and confidential to Analog Devices, Inc. and its licensors.
 */

import { fail } from "assert";
import { expect } from "chai";
import { assert } from "console";
import { Key, Setting, TitleBar, Workbench } from "vscode-extension-tester";


export async function closeFolder() {
    const titleBar = new TitleBar();
    const fileMenu = await titleBar.select("File");
    if (fileMenu !== undefined) {
      if (await fileMenu.hasItem("Close Folder")) {
        await fileMenu.select("Close Folder");
      } else {
        fileMenu.sendKeys(Key.ESCAPE);
      }
    }
  }

describe("Property test", () => {
    beforeEach(async() => {
        await closeFolder();
        await new Workbench().getDriver().sleep(1000);
    });

    it("Getting properties",async () => {
        const workbench = new Workbench();

        const allSetting = workbench.openSettings();
        const setting = await(await allSetting).findSetting("Prop3", "Tester-sample", "Sample"); //Tester-sample › Title2: Prop5
        
        if(setting){
            const value = await setting.getValue();
            expect(value).to.equal("Default Value T_3 P_3"); 
        }
        else {
            fail("Could not find 'Tester-sample > Temp4: Prop3'.");
        }
    });
});