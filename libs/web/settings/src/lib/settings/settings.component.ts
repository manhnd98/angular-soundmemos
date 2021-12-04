import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TuiDialogContext, TuiNotificationsService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ISettingForm } from '../state/settings.model';
import { SettingsStore } from '../state/settings.store';

@Component({
  selector: 'soundmemos-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  settingForm: FormGroup;
  settingsState$ = this.settingsStore.getSettingStates$;

  constructor(
    private fb: FormBuilder,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<ISettingForm | null>,
    @Inject(TuiNotificationsService)
    private readonly notificationsService: TuiNotificationsService,
    @Inject(SettingsStore)
    private settingsStore: SettingsStore
  ) {
    this.settingForm = this.fb.group({
      configClass: ['Recording'],
      audioInput: [''],
      audioOutput: [''],
      videoInput: [''],
      ioBufferSize: [2048],
      sampleRate: [44100],
      outputType: ['wav'],
      error: [''],
    });
    this.settingsStore.getCurrentConfig$.subscribe((config) => {
      this.settingForm.setValue({ ...config });
      setTimeout(() => {
        if (config?.error) {
          this.settingForm.setErrors({ device: true });
        } else {
          this.settingForm.setErrors(null);
        }
      }, 0);
    });
  }
  /**
   * Save config
   */
  saveConfig(): void {
    this.settingsStore.saveConfig({
      ...this.settingForm.value,
    });
    this.context.completeWith(this.settingForm.value);
    this.showNotification();
  }
  /**
   * Cancel Setting
   */
  cancelSetting() {
    this.context.completeWith(null);
  }
  /**
   * Warnign config error
   */
  showNotification() {
    this.notificationsService
      .show('Go ahead!', {
        label: 'Save config success',
      })
      .subscribe();
  }
}
