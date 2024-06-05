import { Component, Host, h, Prop, State, Event, EventEmitter } from '@stencil/core';
import { AmbulanceAdminsApi, Ambulance, AmbulanceWithAppointmentInfo } from '../../api';
import { HomePage } from '../pprerko-home-page/pprerko-home-page';
@Component({
  tag: 'pprerko-ambulance-editor',
  styleUrl: 'pprerko-ambulance-editor.css',
  shadow: true,
})

export class pprerkoAmbulanceWlEditor {

  @Prop({ attribute: "entry-id" })
  entryId: string;

  @Event()
  ambulanceChange: EventEmitter<Ambulance>;

  @Event()
  canceled: EventEmitter<Ambulance>;

  @Event()
  deleted: EventEmitter<Ambulance>;

  @State()
  entry: AmbulanceWithAppointmentInfo;

  private originalSnapshot: AmbulanceWithAppointmentInfo;

  @Prop({ attribute: "api-uri" })
  apiUri: string = null;

  private adminApiClient = new AmbulanceAdminsApi(undefined, this.apiUri);

  private get isNewEntry() { return !this.entryId || this.entryId === "@new" }
  private ambulanceId!: HTMLInputElement;
  private ambulanceName!: HTMLInputElement;
  private doctorName!: HTMLInputElement;
  private location!: HTMLInputElement;

  @State()
  alreadyExists: boolean = false;

  @State()
  showDialog: boolean = false;

  async componentWillLoad() {
    this.alreadyExists = false;

    if (this.isNewEntry) {
      this.entry = {
        "ambulance": {
          "id": "x456789",
          "name": "doktor-oetker-sobrance",
          "doctorName": "Doktor Oetker",
          "location": "Sobrance"
        },
        "appointments": [

        ],
        "moneySum": 12345789
      } as AmbulanceWithAppointmentInfo

    } else {
      this.entry = await this.adminApiClient
        .getAmbulance(this.entryId)
        .then(_ => _.data)
        .catch(_ => { return {} as AmbulanceWithAppointmentInfo });

      if (this.entry.appointments === null) {
        this.entry.appointments = []
      }
    }
    this.originalSnapshot = this.entry;
  }

  handleDataChange() {
    this.entry.ambulance = {
      ...this.entry.ambulance,
      id: this.ambulanceId.value,
      name: this.ambulanceName.value,
      doctorName: this.doctorName.value,
      location: this.location.value
    };
  }

  async handleConfirm() {
    try {
      if (this.isNewEntry) {
        let doesExist = null
        let response = await this.adminApiClient.getAmbulanceEntries()
        if (response.data) {
          response.data.forEach(element => {
            if (element.id == this.entry.ambulance.id) {
              doesExist = true
            }
          });
        }

        if (doesExist) {
          this.alreadyExists = true
          return
        }
        else {
          await this.adminApiClient.createAmbulance(this.entry.ambulance);
        }

      } else {
        await this.adminApiClient.updateAmbulance(this.entry.ambulance.id, this.entry.ambulance);
      }
      this.originalSnapshot = this.entry;
      this.ambulanceChange.emit(this.entry.ambulance);
    } catch (e) {
      console.log(e)
    }
  }

  handleCancel() {
    this.entry = this.originalSnapshot;
    this.canceled.emit(this.entry.ambulance);
  }

  async handleDelete() {
    this.showDialog = true;
  }

  async handleDialogClose() {
    this.showDialog = false;
  }

  async handleDeleteDelete() {
    await this.adminApiClient.deleteAmbulance(this.entryId)
    this.deleted.emit(this.entry.ambulance);
  }

  @Prop({ attribute: "base-path" }) basePath: string = "";

  rebase(path): string {
    if (this.basePath.endsWith("/")) {
      this.basePath = this.basePath.substring(0, this.basePath.length - 1);
    }
    return this.basePath + path;
  }

  async handleEntrySelection(entry, _) {
    HomePage.MainRouter.push(this.rebase(`/appointment/entry/${entry}`));
  }

  render() {
    return (
      <Host>
        <div>
          <mwc-textfield icon="fingerprint"
            disabled={!this.isNewEntry}
            label="ID"
            ref={(el) => this.ambulanceId = el}
            onChange={this.handleDataChange.bind(this)}
            value={this.entry.ambulance.id}>
          </mwc-textfield>
        </div>

        <mwc-textfield icon="local_hospital"
          label="Name"
          ref={(el) => this.ambulanceName = el}
          onChange={this.handleDataChange.bind(this)}
          value={this.entry.ambulance.name}>
        </mwc-textfield>

        <mwc-textfield icon="person"
          label="Doctor name"
          ref={(el) => this.doctorName = el}
          onChange={this.handleDataChange.bind(this)}
          value={this.entry.ambulance.doctorName}>
        </mwc-textfield>

        <mwc-textfield icon="location_on"
          label="Location"
          ref={(el) => this.location = el}
          onChange={this.handleDataChange.bind(this)}
          value={this.entry.ambulance.location}>
        </mwc-textfield>

        <mwc-textfield icon="money"
          disabled
          label="Money"
          onChange={this.handleDataChange.bind(this)}
          value={this.entry.moneySum}>
        </mwc-textfield>

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
            disabled={!this.entry?.ambulance.id}
            onClick={this.handleConfirm.bind(this)}>
          </mwc-button>
        </div>

        {this.alreadyExists
          ? <div class="already-exists">
            <p>This id already exists</p>
          </div>
          : null
        }

        <mwc-dialog open={this.showDialog}>
          <div>Delete ambulance</div>
          <mwc-button
            slot="primaryAction"
            onClick={this.handleDialogClose.bind(this)}>
            No
          </mwc-button>
          <mwc-button
            slot="secondaryAction"
            onClick={this.handleDeleteDelete.bind(this)}>
            Yes
          </mwc-button>
        </mwc-dialog>
        <div class="listItem">
          <h1 class="textAlignCenter">Medical appointments</h1>
          {this.entry.appointments.length > 0
            ? <mwc-list >
              {this.entry.appointments.map(entry =>
                <mwc-list-item graphic="avatar" twoline onRequest-selected={_ => this.handleEntrySelection(entry.id, _)} class="listItem">
                  <div>Patient name: {entry.patientName}</div>
                  <div>Cost: {entry.cost}</div>
                  <div>Ambulance id: {entry.ambulanceId}</div>
                  <mwc-icon slot="graphic">schedule</mwc-icon>
                </mwc-list-item>
              )}
            </mwc-list>
            : <h4 class="textAlignCenter">There are no medical appointments yet</h4>
          }
        </div>
      </Host>
    );
  }
}
