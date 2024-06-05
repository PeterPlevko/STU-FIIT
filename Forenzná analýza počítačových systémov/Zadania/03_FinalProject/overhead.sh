#!/bin/bash

mkfs.$1 file.img

mount=/mnt/media

mount file.img $mount
echo "*****MOUNTED*****"

inf=/dev/zero
ouf=$mount/speed
bytes=$((256*1024*1024))

echo $1 >> df.txt
echo $1 >> dd.txt

for i in 1 256 1024 4096 16384
do
	size=$(($bytes/$i))
	for file in $(seq 1 $i)
	do
		dd if=$inf of=$ouf$file.empty bs=$size count=1 >> dd.txt 2>&1
	done
	df | tail -n 1 | awk '{print $3","$4}' >> df.txt
	rm $ouf*
done

umount /mnt/media
echo "****UNMOUNTED****"

exit 0;
