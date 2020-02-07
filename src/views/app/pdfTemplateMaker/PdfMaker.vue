<template>
  <a-row>
    <a-col :span="12">
        <pdf-display :record="pdf_record"  />
    </a-col>
    <a-col :span="12">
        <pdf-form-data :record="pdf_record" />
    </a-col>
  </a-row>
</template>

<script>
import PdfDisplay from './PdfDisplay';
import PdfFormData from './PdfFormData';

export default {
    components: {PdfDisplay,PdfFormData},
    data() {
        return {
            pdf_record: {
                datas: []
            }
        }
    },
}
</script>

<style>

</style>