<template>
  <div>
    <CardMainRight title="Data TopUp">
      <template #body>
        <g-button
          :isLoading="getLoading"
          @cus-click="handleRefresh"
          class="btn btn-secondary btn-sm shadow"
        >
          Refresh Data
        </g-button>
        <b-table
          responsive
          class="mt-3"
          outlined
          striped
          hover
          :items="getAllTopUp"
          :current-page="currentPage"
          :per-page="perPage"
          :fields="fields"
        >
          <template v-slot:cell(id)="data">
            {{ data.index + 1 }}
          </template>
          <template v-slot:cell(amount)="data">
            {{ data.item.amount | currency }}
          </template>
          <template v-slot:cell(date)="data">
            {{ new Date(data.item.date) | dateFormat('YYYY-MM-DD HH:mm') }}
          </template>
          <template v-slot:cell(statusTopup)="data">
            <span
              class="badge"
              :class="[
                data.item.statusTopup === 1
                  ? 'badge-success'
                  : data.item.statusTopup === 2
                  ? 'badge-danger'
                  : 'badge-info'
              ]"
              >{{
                data.item.statusTopup === 1
                  ? 'Success'
                  : data.item.statusTopup === 2
                  ? 'Rejected'
                  : 'Pending'
              }}</span
            >
          </template>
          <template v-slot:cell(image)="data">
            <div class="cursor-pointer" @click="handleImage(data.item.image)">
              <b-avatar rounded="lg" :src="data.item.image"></b-avatar>
            </div>
          </template>
          <template v-slot:cell(option)="data">
            <button
              v-if="data.item.statusTopup === 0"
              @click="handleAcc(data.item.id)"
              class="btn btn-sm btn-success mr-1 mb-1 shadow"
            >
              <b-icon icon="check" />
            </button>
            <button
              v-if="data.item.statusTopup === 0"
              @click="handleReject(data.item.id)"
              class="btn btn-sm btn-danger mb-1 shadow"
            >
              <b-icon icon="x" />
            </button>
          </template>
        </b-table>
        <div>
          <b-pagination
            v-model="currentPage"
            :total-rows="getAllTopUp.length"
            :per-page="perPage"
            size="md"
            class="my-0"
          ></b-pagination>
        </div>
      </template>
    </CardMainRight>
    <ModalImage :image="image" />
  </div>
</template>

<script>
import ModalImage from '@/components/ModalImage'
import CardMainRight from '@/components/CardMainRight'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      currentPage: 1,
      image: '',
      perPage: 10,
      // Note `isActive` is left out and will not appear in the rendered table
      fields: [
        {
          key: 'id',
          label: 'no'
        },
        {
          key: 'senderName',
          label: 'Name'
        },
        'amount',
        'date',
        {
          key: 'image',
          label: 'Proof'
        },
        {
          key: 'statusTopup',
          label: 'Status Top Up'
        },
        'option'
      ]
    }
  },
  methods: {
    ...mapActions('history', ['allTopUp', 'changeStatus']),
    ...mapActions('user', ['myProfile']),
    handleRefresh() {
      this.allTopUp()
    },
    handleImage(val) {
      this.image = val
      this.$bvModal.show('modal-image')
    },
    handleAcc(id) {
      this.confirmSwal(
        'Top Up',
        'Sure you want to receive this top up',
        'question',
        () => {
          this.changeStatus({ id, data: 1 })
            .then((response) => {
              this.$toast.success('Top Up accepted')
              this.allTopUp()
            })
            .catch((err) => {
              console.log(err)
              this.$toast.error(err.data.message)
            })
        }
      )
    },
    handleReject(id) {
      this.confirmSwal(
        'Top Up',
        'Sure you want to reject this top up',
        'warning',
        () => {
          this.changeStatus({ id, data: 2 })
            .then((response) => {
              this.$toast.error('Top Up rejected')
              this.allTopUp()
            })
            .catch((err) => {
              this.$toast.error(err.data.message)
            })
        }
      )
    }
  },
  mounted() {
    this.myProfile()
      .then((response) => {
        if (response.results.roleId !== 1) {
          this.$router.push({ name: 'Dashboard' })
        } else {
          this.allTopUp()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  components: {
    CardMainRight,
    ModalImage
  },
  computed: {
    ...mapGetters('user', ['getMyProfile']),
    ...mapGetters('history', ['getAllTopUp']),
    ...mapGetters(['getLoading'])
  }
}
</script>

<style scoped>
</style>
