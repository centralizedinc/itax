<template>
<v-card>
    <!-- <v-card-title>Part I - Background Information</v-card-title> -->
  <v-layout row wrap pa-2> 
      <v-flex xs12>
         <v-divider ></v-divider> 
      </v-flex>        
      <v-flex xs4>
        <v-subheader>1. For the Month </v-subheader>
      </v-flex>
      <v-flex xs7>
          <v-menu
              ref="menu"
              lazy
              :close-on-content-click="true"
              v-model="menu"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-right="40"
              min-width="290px"
              :return-value.sync="formDetails.dateFormatted"
          >
              <v-text-field
                  slot="activator"
                  label="1. For the Month "
                  v-model="formattedDate"
                  append-icon="event"
                  readonly
              ></v-text-field>
                  <v-date-picker :show-current="true" @input="$refs.menu.save(formDetails.dateFormatted)" v-model="formDetails.dateFormatted" no-title scrollable type="month">
                      <!-- <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.menu.save(formDetails.dateFormatted)">OK</v-btn> -->
                  </v-date-picker>
          </v-menu>
        <!-- <v-menu lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" >
            <v-text-field slot="activator" 
                    label="For the Month" 
                    v-model="formDetails.dateFormatted" 
                    readonly 
                    @blur="date = parseDate(dateFormatted)"></v-text-field>
            <v-date-picker type="month" v-model="date" no-title scrollable actions @input="dateFormatted = formatDate($event)">
                <template slot-scope="{ save, cancel }">
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                    <v-btn flat color="primary" @click="save">OK</v-btn>
                    </v-card-actions>
                </template>
            </v-date-picker>
        </v-menu>         -->
            </v-flex>
            <v-flex xs4>
                    <v-subheader>2. Amended Return</v-subheader>
                </v-flex>
                <v-flex xs7>
                    <v-select 
                    label="Amended Return" 
                    single-line 
                    bottom 
                    :items="itemYN" 
                    v-model="formDetails.amendedYn">                    
                    </v-select>
                </v-flex>
                <v-flex xs4>
                    <v-subheader>3. Number of Sheets</v-subheader>
                </v-flex>
                <v-flex xs7>
                    <v-text-field name="input-1" 
                    label="3. Number of Sheets" 
                    v-model="formDetails.numOfSheet"                    
                    >
                    </v-text-field>
                </v-flex>
                <v-flex xs4>
                    <v-subheader>4. Any Tax Withheld?</v-subheader>
                </v-flex>
                <v-flex xs7>
                    <v-select single-line 
                    bottom 
                    :items="itemYN" 
                    v-model="formDetails.opnYn"></v-select>
            </v-flex>                                                   
     </v-layout>
     </v-card>
</template>

<script>
export default {
  name: "page-1",
  props: ["formDetails", "errors"],
  data: () => ({
      menu:false,
    date: null,
    menu: false,
    modal: false,
    itemYN: [
          { text: 'YES', value: "Y" },
          { text: 'NO', value: "N" }
        ]
  }),
  computed:{
      formattedDate(){
          return this.formatDate(this.formDetails.dateFormatted)
      }
  },
  methods:{
      formatDate (date) {
        if (!date) {
          return null
        }

        const [year, month, day] = date.split('-')
        return `${month}/${year}`
      }
  }
};
</script>