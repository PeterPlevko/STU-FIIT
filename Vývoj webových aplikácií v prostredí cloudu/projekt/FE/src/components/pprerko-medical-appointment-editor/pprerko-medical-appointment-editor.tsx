import { Component, Host, h, Prop, State, Event, EventEmitter } from '@stencil/core';
import { AmbulanceUsersApi, MedicalAppointment, Ambulance, AmbulanceAdminsApi } from '../../api';
import { HomePage } from '../pprerko-home-page/pprerko-home-page';

@Component({
  tag: 'pprerko-medical-appointment-editor',
  styleUrl: 'pprerko-medical-appointment-editor.css',
  shadow: true,
})
export class PprerkoMedicalAppointmentEditor {

  @Prop({ attribute: "entry-id" })
  entryId: string;

  @Event()
  medicalAppointmentChange: EventEmitter<MedicalAppointment>;

  @Event()
  canceled: EventEmitter<MedicalAppointment>;

  @Event()
  deleted: EventEmitter<MedicalAppointment>;

  @State()
  entryMedicalAppointment: MedicalAppointment;

  @State()
  entryAmbulance: Ambulance[];

  @State()
  entryPaidBy: any;

  @Prop({ attribute: "api-uri" })
  apiUri: string = null;

  @State()
  showDialog: boolean = false;

  private originalSnapshot: MedicalAppointment;

  private userApiClient = new AmbulanceUsersApi(undefined, this.apiUri);

  private adminApiClient = new AmbulanceAdminsApi(undefined, this.apiUri);

  private get isNewEntry() { return !this.entryId || this.entryId === "@new" }

  @State()
  alreadyExists: boolean = false;

  private id!: HTMLInputElement;
  private patientName!: HTMLInputElement;
  private type!: HTMLInputElement;
  private cost!: HTMLInputElement;

  async componentWillLoad() {
    if (this.isNewEntry) {
      this.entryMedicalAppointment = {
        "id": "x321ab43",
        "patientName": "Jožko Vajda",
        "ambulanceId": "doktor-oetker-sobrance",
        "type": "Preventivka",
        "dateTime": "2038-12-24T10:05:00Z",
        "cost": 1234,
        "paidBy": "insurance"
      } as MedicalAppointment

      this.entryAmbulance = await this.adminApiClient
      .getAmbulanceEntries()
      .then(_ => _.data)
      .catch(_ => null);      

      if(this.entryAmbulance){
        this.entryMedicalAppointment.ambulanceId = this.entryAmbulance[0].id;
      }
      else{
        this.entryMedicalAppointment.ambulanceId = null
      }
    } else {
      this.entryMedicalAppointment = await this.userApiClient
        .getAppointment(this.entryId)
        .then(_ => _.data)
        .catch(_ => {return {} as MedicalAppointment});
    }

    this.entryAmbulance = await this.adminApiClient
      .getAmbulanceEntries()
      .then(_ => _.data)
      .catch(_ => [])

      if(this.entryAmbulance === null){
        this.entryAmbulance = []
      }

    this.entryPaidBy = [
      "insurance",
      "patient"
    ];

    this.originalSnapshot = this.entryMedicalAppointment;
  }

  handleDataChange() {

    this.entryMedicalAppointment = {
      ...this.entryMedicalAppointment,
      id: this.id.value,
      patientName: this.patientName.value,
      ambulanceId: this.entryMedicalAppointment.ambulanceId,
      type: this.type.value,
      dateTime: this.entryMedicalAppointment.dateTime,
      cost: Number(this.cost.value),
      paidBy: this.entryMedicalAppointment.paidBy
    };
  }

  @Prop({ attribute: "base-path" }) basePath: string = "";

  rebase(path): string {
    if (this.basePath.endsWith("/")) {
      this.basePath = this.basePath.substring(0, this.basePath.length - 1);
    }
    return this.basePath + path;
  }

    async handleSave(){
      this.showDialog = false;
      HomePage.MainRouter.push(this.rebase(`/doctor/`));
    }

    async handleAmbulanceChange(ev: Event) {
      const selectedValue = (ev.target as HTMLSelectElement).value;
      this.entryMedicalAppointment = {
        ...this.entryMedicalAppointment,
        id: this.id.value,
        patientName: this.patientName.value,
        ambulanceId: selectedValue,
        type: this.type.value,
        dateTime: this.entryMedicalAppointment.dateTime,
        cost: Number(this.cost.value),
        paidBy: this.entryMedicalAppointment.paidBy
      };
    }

    async handlePaidBy(ev: Event) {
      const selectedValue = (ev.target as HTMLSelectElement).value;
      this.entryMedicalAppointment = {
        ...this.entryMedicalAppointment,
        id: this.id.value,
        patientName: this.patientName.value,
        ambulanceId: this.entryMedicalAppointment.ambulanceId,
        type: this.type.value,
        dateTime: this.entryMedicalAppointment.dateTime,
        cost: Number(this.cost.value),
        paidBy: selectedValue
      };
    }

  async handleConfirm() {
    if (this.isNewEntry) {
      if(this.entryMedicalAppointment.ambulanceId === ""){
        this.showDialog = true;
        return
      }
      else{
        let doesExist = null
        let response = await this.userApiClient.getAppointmentEntries()
        if(response.data){
          response.data.forEach(element => {
            if (element.id == this.entryMedicalAppointment.id) {
              doesExist = true
            }
          });
        }
        if (doesExist) {
          this.alreadyExists = true
          return
        }
        else{
          await this.userApiClient.createAppointment(this.entryMedicalAppointment);
        }
      }
    } else {
      await this.userApiClient.updateAppointment(this.entryMedicalAppointment.id, this.entryMedicalAppointment);
    }
    this.originalSnapshot = this.entryMedicalAppointment;
    this.medicalAppointmentChange.emit(this.entryMedicalAppointment);
  }

  handleCancel() {
    this.entryMedicalAppointment = this.originalSnapshot;
    this.canceled.emit(this.entryMedicalAppointment);
  }

  async handleDelete() {
    await this.userApiClient.deleteAppointment(this.entryId)
    this.deleted.emit(this.entryMedicalAppointment);
  }

  private isoDateToLocale(iso: string) {
    if (!iso) return '';
    return new Date(Date.parse(iso)).toLocaleTimeString()
  }

  render() {
    return (
      <Host>
        <div>
        <mwc-textfield icon="fingerprint"
          disabled={!this.isNewEntry}
          label="ID"
          ref={(el) => this.id = el}
          onChange={this.handleDataChange.bind(this)}
          value={this.entryMedicalAppointment.id}>
        </mwc-textfield>
        </div>

        <mwc-textfield icon="person"
          label="Patient name"
          ref={(el) => this.patientName = el}
          onChange={this.handleDataChange.bind(this)}
          value={this.entryMedicalAppointment.patientName}>
        </mwc-textfield>

        <mwc-select icon="local_hospital"
          label="Ambulance id"
          onChange={this.handleAmbulanceChange.bind(this)}>
          {this.entryAmbulance.map(ambulance =>
            <mwc-list-item value={ambulance.id}
              selected={ambulance.id === this.entryMedicalAppointment.ambulanceId}
            >{ambulance.id}</mwc-list-item>
          )}
        </mwc-select>

        <mwc-textfield icon="format_list_bulleted"
          label="Type of appointment"
          ref={(el) => this.type = el}
          onChange={this.handleDataChange.bind(this)}
          value={this.entryMedicalAppointment.type}>
        </mwc-textfield>

        <mwc-textfield icon="calendar_month"
          disabled
          label="Date of appointment"
          onChange={this.handleDataChange.bind(this)}
          value={this.isoDateToLocale(this.entryMedicalAppointment.dateTime)}>
        </mwc-textfield>

        <mwc-textfield icon="payments"
          label="Cost"
          ref={(el) => this.cost = el}
          onChange={this.handleDataChange.bind(this)}
          value={this.entryMedicalAppointment.cost}>
        </mwc-textfield>

        <mwc-select icon="account_balance_wallet"
          label="Paid by"
          onChange={this.handlePaidBy.bind(this)}>
          {this.entryPaidBy.map(paidBy =>
            <mwc-list-item value={paidBy}
              selected={paidBy === this.entryMedicalAppointment.paidBy}
            >{paidBy}</mwc-list-item>
          )}
        </mwc-select>

        <div class="actions">
          <mwc-button id="delete" icon="delete"
            label="Zmazať"
            disabled={this.isNewEntry}
            onClick={this.handleDelete.bind(this)}>
          </mwc-button>

          <mwc-button id="cancel" icon="close"
            label="Zrušiť"
            onClick={this.handleCancel.bind(this)}>
          </mwc-button>

          <mwc-button id="confirm" icon="save"
            label="Uložit"
            disabled={!this.entryMedicalAppointment?.id}
            onClick={this.handleConfirm.bind(this)}>
          </mwc-button>
        </div>
        <mwc-dialog open={this.showDialog}>
          <div>You have to create ambulance and then appointment</div>
          <mwc-button
              slot="primaryAction"
              onClick={this.handleSave.bind(this)}
              >
            Ok
          </mwc-button>
        </mwc-dialog>
        {this.alreadyExists
          ? <div class="already-exists">
            <p>This id already exists</p>
          </div>
          : null
        }
      </Host>
    );
  }
}
