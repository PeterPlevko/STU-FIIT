#!/bin/bash

file=$1.img
args=$2
size=$3
recover=$4

dd if=/dev/zero of=$file bs=1M count=$size
mkfs.$1 $args $file
mount=/mnt/test

for i in $size
do
	mount -o sync $file $mount
	sudo rm -rf $mount/*
	for j in $(seq 1 $i)
	do
		touch $mount/cover$j.txt
		echo "TEST" >> $mount/cover$j.txt
	done
	files=$(ls -la $mount | wc -l)
	rm -rf ./restored
	mkdir ./restored
	umount $mount
	sleep 3
	mount -o sync $file $mount
	rm $mount/*.txt
	umount $mount
	sleep 3
	$recover
	echo "Recovered for $1: "$(($(ls -la ./restored | wc -l) - 3))"/"$(($files - 3))
	echo $1 " " $(($(ls -la ./restored | wc -l) - 3)) " " $(($files - 3)) >> recovered.txt
done

exit 0;
