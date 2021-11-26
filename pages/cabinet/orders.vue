<template>
  <v-layout column>
    <section>
      <h1 class="headline">Страховки</h1>

      <hr />

      <v-simple-table fixed-header height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th v-for="(item, idx) in headers" :key="idx">{{ item.text }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in desserts" :key="item.id">
              <td>{{ idx + 1 }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.isPaid }}</td>
              <td>{{ item.polis }} сум</td>
              <td>
                <strong>Джалилов Шахзод</strong>
                <br />
                <a href="tel:998903182728">+998 90 318 27 28</a>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <!-- <v-data-table :headers="headers" :items="desserts" class="cabinet__table">
        <template v-slot:header.name="{ header }">
          <v-select
            :label="header.text"
            :items="header.items"
          ></v-select>
        </template>
      </v-data-table>-->
    </section>
  </v-layout>
</template>

<script>
export default {
  layout: "cabinet",
  async asyncData({ store, $axios, route }) {
    const token = store.getters["user"].access_token;
    let doc = await $axios.$get(`/doc/get`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    let desserts = doc.map((i) => {
      if (i.type == "osgo") {
        i.type = "ОСГО";
      } else if (i.type == "kasko") {
        i.type = "КАСКО";
      } else if (i.type == "travelUz") {
        i.type = "Путешествие";
      }
      if (i.isPaid) {
        i.isPaid = "Оплачено";
      } else {
        i.isPaid = "Не оплачено";
      }
      return { id: i.id, type: i.type, isPaid: i.isPaid, polis: i.desc.polis };
    });
    return { desserts };
  },
  data: () => ({
    item: "",
    headers: [
      {
        text: "#",
        align: "start",
        value: "id",
      },
      {
        text: "Продукт",
        value: "prod",
      },
      {
        text: "Статус",
        value: "status",
      },
      {
        text: "Стоимость страхования",
        value: "polis",
      },
      {
        text: "Ответственный",
        value: "protein",
      },
    ],
  }),
};
</script>
