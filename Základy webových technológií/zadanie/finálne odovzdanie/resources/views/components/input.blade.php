@props(['disabled' => false])

<input {{ $disabled ? 'disabled' : '' }} {!! $attributes !!}>
