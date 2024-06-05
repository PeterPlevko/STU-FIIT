import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { AmbulanceAdminsApi, Ambulance } from '../../api';

@Component({
  tag: 'pprerko-ambulance-list',
  styleUrl: 'pprerko-ambulance-list.css',
  shadow: true,
})
export class PprerkoList {

  @Prop({ attribute: "selected-entry-id", mutable: true, reflect: true})
  selectedEntryId: string

  @Event()
  ambulanceSelected: EventEmitter<string>;

  handleEntrySelection(entryId: string, event: CustomEvent) {
    if(event.detail.source === "interaction") {
      this.selectedEntryId = entryId;
      this.ambulanceSelected.emit(entryId);
    }
  }
  ambulanceList: Ambulance[];



  @Prop({ attribute: "api-uri" })
  apiUri: string = null;

  private adminApiClient = new AmbulanceAdminsApi(undefined, this.apiUri);

  async componentWillLoad() {
    this.ambulanceList = await this.adminApiClient
      .getAmbulanceEntries()
      .then(_ => _.data)
      .catch(_ => []);
    if(this.ambulanceList === null){
      this.ambulanceList = [];
    }
  }

  render() {
    return (
      <Host>
        <div>
        <mwc-list>
          { this.ambulanceList.map( entry =>
            <mwc-list-item graphic="avatar" twoline
                           selected={entry.id === this.selectedEntryId ? true : false}
                           activated={entry.id === this.selectedEntryId ? true : false}
                           onRequest-selected={ev => this.handleEntrySelection(entry.id, ev)} class="listItem">
              <div>{entry.name}</div>
              <mwc-icon class="hospitalIcon" slot="graphic">local_hospital</mwc-icon>
            </mwc-list-item>
          )}
        </mwc-list>
        </div>
      </Host>
    );
  }
}
