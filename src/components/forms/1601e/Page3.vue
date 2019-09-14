<template>
  <v-card>
    <v-card-title>
      Part II - Computation of Tax
      <v-spacer></v-spacer>  
      <!-- <v-btn fab  @click.native.stop="dialog = true"> <v-icon dark>add</v-icon></v-btn>   
      <v-btn fab> <v-icon dark>delete</v-icon></v-btn>  -->
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>      
      <v-data-table :headers="headers" :items="items">
      <template slot="items" slot-scope="props">
        <td>
          <v-edit-dialog lazy> {{ props.item.name }}
            <v-text-field
              slot="input"
              label="Edit"
              v-model="props.item.name"
              single-line
              counter
              :rules="[max25chars]"
            ></v-text-field>
          </v-edit-dialog>
        </td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="text-xs-right">{{ props.item.sodium }}</td>
        <td class="text-xs-right">{{ props.item.calcium }}</td>
        <td class="text-xs-right">
          <v-edit-dialog
            @open="tmp = props.item.iron"
            @save="props.item.iron = tmp || props.item.iron"
            large
            lazy
          >
            <div>{{ props.item.iron }}</div>
            <div slot="input" class="mt-3 title">Update Iron</div>
            <v-text-field
              slot="input"
              label="Edit"
              v-model="tmp"
              single-line
              counter
              autofocus
              :rules="[max25chars]"
            ></v-text-field>
          </v-edit-dialog>
        </td>
      </template>
      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>
    </v-data-table>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn small color="primary">      
        <v-icon dark>edit</v-icon>
        Add
      </v-btn>
      <v-btn outline small color="primary">
        <v-icon dark>delete</v-icon>
        Delete
      </v-btn>
    </v-card-actions>
    </v-card-text>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Computation of Tax</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              
              <v-flex xs12>
                <v-select
                  label="ATC Code"
                  required
                  :items="[{label:'WC010', description:'PROFL TALENT FEE PD JURIDICL (GROSS INC <= 72,000)', rate: 10}, 
                            {label:'WC010', description:'PROFL TALENT FEE PD JURIDICL (GROSS INC <= 72,000)', rate: 10},
                            {label:'WC010', description:'PROFL TALENT FEE PD JURIDICL (GROSS INC <= 72,000)', rate: 10}]"
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-select
                  label="Interests"
                  multiple
                  autocomplete
                  chips
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import atcList from "../attachments/AtcList";

export default {
  data() {
    return {
      headers: [
        { text: "Nature Of Income", value: "test" },
        { text: "ATC", value: "test" },
        { text: "Base", value: "test" },
        { text: "Rate", value: "test" },
        { text: "Required Withheld", value: "tax_withheld" }
      ],
      items: [],
      dialog: false
    };
  }
};
</script>

<style>
</style>
