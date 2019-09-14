<template>
  <a-card>
  <a-tabs>
    <a-tab-pane key="1" tab="Change Password">
        <a-form>
            <a-form-item>
                <a-input type="password" placeholder="Old Password"></a-input>
            </a-form-item>
            <a-form-item>
                <a-input type="password" placeholder="New Password"></a-input>
            </a-form-item>
            <a-form-item>
                <a-input type="password" placeholder="Confirm Password"></a-input>
            </a-form-item>
        </a-form>
    </a-tab-pane>
    <a-tab-pane key="2" tab="Account Settings">
        <a-row>
            <a-col :span="20">
                <a-card>
                    <a-row type="flex" align="middle" :gutter="16">
                        <a-col :span="6">
                            <a-avatar shape="square" :size="64" style="z-index:1;background: linear-gradient(to left, #000046, #1cb5e0);">
                                    <a-icon style="font-size:24px" type="mobile"></a-icon>
                                </a-avatar>
                        </a-col>
                        <a-col :span="14">
                            <h4>Enable Two-Factor Authentication</h4>
                            <p>Lorem ipsum dolor sit amet labore et dolore magna aliqua.</p>
                            
                        </a-col>
                        <a-col :span="2">
                            <a-switch defaultChecked />
                            <p style="margin-top: 1vh; font-size:10px">Enabled</p>
                        </a-col>
                    </a-row>
                </a-card>
            </a-col>
            <a-col :span="20">
                <a-card>
                    <a-row type="flex" align="middle" :gutter="16">
                        <a-col :span="6">
                            <a-avatar shape="square" :size="64" style="z-index:1;background: linear-gradient(to left, #000046, #1cb5e0);">
                                    <a-icon style="font-size:24px" type="mail"></a-icon>
                                </a-avatar>
                        </a-col>
                        <a-col :span="14">
                            <h4>Enable Email Notification</h4>
                            <p>Lorem ipsum dolor sit amet labore et dolore magna aliqua.</p>
                            
                        </a-col>
                        <a-col :span="2">
                            <a-switch defaultChecked />
                            <p style="margin-top: 1vh; font-size:10px">Enabled</p>
                        </a-col>
                    </a-row>
                </a-card>
            </a-col>
            <a-col :span="20">
                <a-card>
                    <a-row type="flex" align="middle" :gutter="16">
                        <a-col :span="6">
                            <a-avatar shape="square" :size="64" style="z-index:1;background: linear-gradient(to left, #000046, #1cb5e0);">
                                    <a-icon style="font-size:24px" type="exclamation-circle"></a-icon>
                                </a-avatar>
                        </a-col>
                        <a-col :span="14">
                            <h4>Account Recovery (Secret Question)</h4>
                            <p>Lorem ipsum dolor sit amet labore et dolore magna aliqua.</p>
                            
                        </a-col>
                        <a-col :span="2">
                            <a-switch defaultChecked />
                            <p style="margin-top: 1vh; font-size:10px">Enabled</p>
                        </a-col>
                    </a-row>
                </a-card>
            </a-col>
        </a-row>
        <!-- <a-form-item>
            <a-switch defaultChecked />
            <span style="margin-left: 2vh">Enable Two-Factor Authentication</span>
        </a-form-item>
        <a-form-item>
            <a-switch defaultChecked/>
            <span>Enable Email Notification</span>
        </a-form-item>
        <a-form-item>
            <a-switch defaultChecked/>
            <span>Lock Account on 3 consecutive failed attempts</span>
        </a-form-item> -->
        
    </a-tab-pane>
  </a-tabs>
  <a-divider></a-divider>
  <a-button type="primary">Save Changes</a-button>
  </a-card>
</template>

<script>
export default {

}
</script>

<style>

</style>