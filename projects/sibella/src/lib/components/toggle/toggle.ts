import {
  Component,
  forwardRef,
  HostBinding,
  ChangeDetectionStrategy,
  Input,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.html',
  styleUrls: ['./toggle.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Toggle),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toggle implements ControlValueAccessor {
  public value = false;
  public disabled = false;

  private onChange: (val: boolean) => void = () => { };
  private onTouched: () => void = () => { };

  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  constructor(
    public elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostBinding('attr.aria-checked') get ariaChecked() {
    return this.value;
  }

  @HostBinding('attr.role') role = 'switch';
  @HostBinding('attr.tabindex') tabindex = '0';
  
  writeValue(obj: any): void {
    this.value = !!obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = !!isDisabled;
  }

  public toggle() {
    if (this.disabled) return;
    this.value = !this.value;

    this.onChange(this.value);
    this.onTouched();
  }

  public onKeydown(ev: KeyboardEvent) {
    if (this.disabled) return;
    if (ev.code === 'Space' || ev.key === ' ' || ev.key === 'Spacebar' || ev.code === 'Enter') {
      ev.preventDefault();
      this.toggle();
    }
  }

  public focus() {
    (this as any).elementRef?.nativeElement?.focus?.();
  }
}
