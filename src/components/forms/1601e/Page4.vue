<template>
  <v-card>
    <v-card-title>
      Part II - Computation of Tax (Section A)
      <v-spacer></v-spacer>   
    </v-card-title> 
    <v-layout row wrap pa-2>  
      <v-flex xs12>
        <v-divider ></v-divider> 
      </v-flex>
      <v-flex xs4>
        <v-subheader>14. Total Tax Required to be Withheld and Remitted</v-subheader>
      </v-flex>
      <v-flex xs7>
         <v-text-field name="input-1" id="testing" ></v-text-field>
      </v-flex>
      <v-flex xs4>
        <v-subheader>15. Less: Tax Credits/Payments</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field name="input-1" id="testing" ></v-text-field>
      </v-flex>
      <v-flex xs4>
        <v-subheader>15A. Tax Remitted in Return Previous Filed, if this is an amended return</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field name="input-1" id="testing" ></v-text-field>
      </v-flex>
      <v-flex xs4>
          <v-subheader>15B. Advance Payments Made</v-subheader>
          </v-flex>
      <v-flex xs7>
        <v-text-field name="input-1" id="testing" ></v-text-field>
      </v-flex>
      <v-flex xs4>
          <v-subheader>15C. Total Tax Credits/Payments (Sum of items 15A & 15B)</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field name="input-1" id="testing" ></v-text-field>
      </v-flex>
      <v-flex xs4>
          <v-subheader>16. Tax Still Due (Overremittance) (item 14less item 15C)</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field name="input-1" id="testing" ></v-text-field>
      </v-flex>
      <v-flex xs4>
          <v-subheader>17. Add: Penalties</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field name="input-1" id="testing" ></v-text-field>
      </v-flex>
      <v-flex xs4>
          <v-subheader>17A. Surcharge</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field name="input-1" id="testing" ></v-text-field>
      </v-flex>
      <v-flex xs4>
          <v-subheader>17B. Interest</v-subheader>
        </v-flex>
      <v-flex xs7>
        <v-text-field name="input-1" id="testing" ></v-text-field>
      </v-flex>
      <v-flex xs4>
          <v-subheader>17C. Compromise</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field name="input-1" id="testing" ></v-text-field>
      </v-flex>
      <v-flex xs4>
          <v-subheader>17C. Total</v-subheader> 
      </v-flex>
      <v-flex xs7>
        <v-text-field name="input-1" id="testing" ></v-text-field>
      </v-flex>
      <v-flex xs4>
          <v-subheader>18. Total Amount Still Due (Overremittance) (Sum of items 16 & 17D)</v-subheader>
      </v-flex>
      <v-flex xs7>
          <v-text-field name="input-1" id="testing" ></v-text-field>
      </v-flex>                                                                 
    </v-layout>
  </v-card>
</template>

<script>

  export default {   
    data () {
      return {
        myNumberValue:0,
        select: { state: 'Florida', abbr: 'FL' },
        items: [
          { state: 'Florida', abbr: 'FL' },
          { state: 'Georgia', abbr: 'GA' },
          { state: 'Nebraska', abbr: 'NE' },
          { state: 'California', abbr: 'CA' },
          { state: 'New York', abbr: 'NY' }
        ]
      }
    }
  }
</script>


