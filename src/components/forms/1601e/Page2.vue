<template>
<v-card>
    <v-card-title>Part I - Background Information
      <v-spacer></v-spacer>  
             
    </v-card-title>
  <v-layout row wrap pa-2>
      <v-flex xs12>
         <v-divider ></v-divider> 
      </v-flex>
                  <v-flex xs4>
                    <v-subheader>5. TIN</v-subheader>
                </v-flex>
                <v-flex xs7>
                    <v-text-field :mask="'### - ### - ### - ###'" name="input-1" label="5.TIN" v-model="formDetails.taxpayer.tin"></v-text-field>
                </v-flex>
                <v-flex xs4>
                    <v-subheader>6. RDO Code</v-subheader>
                </v-flex>
                <v-flex xs7>
                    <v-text-field name="input-1" label="6.RDO Code" v-model="formDetails.taxpayer.rdo_code"></v-text-field>
                </v-flex>
                <v-flex xs4>
                    <v-subheader>7. Line of Business</v-subheader>
                </v-flex>
                <v-flex xs7>
                    <v-text-field name="input-1" label="7. Line of Business" v-model="formDetails.taxpayer.line_of_business"></v-text-field>
                </v-flex>
                <v-flex xs4>
                    <v-subheader>8. Registered Name</v-subheader>
                </v-flex>
                <v-flex xs7>
                    <v-text-field name="input-1" label="8. Registered Name"></v-text-field>
                </v-flex> 
                <v-flex xs4>
                    <v-subheader>9. Telephone Number</v-subheader>
                </v-flex>
                <v-flex xs7>
                    <v-text-field name="input-1" label="9. Telephone Number"></v-text-field>
                </v-flex>  
                <v-flex xs4>
                    <v-subheader>10. Registered Address</v-subheader>
                </v-flex>
                <v-flex xs7>
                    <v-text-field name="input-1" label="10. Registered Address"></v-text-field>
                </v-flex>  
                <v-flex xs4>
                    <v-subheader>11. Zip Code</v-subheader>
                </v-flex>
                <v-flex xs7>
                    <v-text-field name="input-1" label="11. Zip Code"></v-text-field>
                </v-flex>  
                <v-flex xs4>
                    <v-subheader>12. Category of Witholding Agent</v-subheader>

                    
                </v-flex>
                <v-flex xs7>
                    <v-text-field name="input-1" label="12. Category of Witholding Agent" v-model="formDetails.categoryOfAgent"></v-text-field>
                </v-flex> 
                <v-flex xs4>
                    <v-subheader>13. Are there payees availing for tax relief under Special law or International Tax Treaty?</v-subheader>
                </v-flex>
                <v-flex xs7>
                    <v-text-field name="input-1" label="13. Are there payees availing for tax relief under Special law or International Tax Treaty?"></v-text-field>
                </v-flex>                                                    
     </v-layout>
     </v-card>
</template>

<script>
export default {
    name: "page-1",
    props: ["formDetails"],
    data: () => ({
        dateFormatted: null,
    date: null,
    menu: false,
    modal: false,
    itemYN: [
          { text: 'YES', value: "Y" },
          { text: 'NO', value: "N" }
        ]
    }),
    methods:{

   }
};
</script>