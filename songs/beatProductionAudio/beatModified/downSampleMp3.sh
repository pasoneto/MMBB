folders=("dirtyDishesBeats" "floorplanBeats" "habstrackBeats" "honeysuckleBeats" "lettuceBeats" "softSandBeats" "eclecticBeats" "example" "training")

for folder in ${folders[@]}; 
  do currentFile=$folder;
  echo "Processing " $folder
  cd $folder
  files=$(ls)
  for file in ${files[@]}; do
    if [[ "$file" =~ .*"mp3".* ]]; then
      ffmpeg -i $file -codec:a libmp3lame -b:a 128k down"$file"
    fi
  done
  cd ..
  echo "\n"
done
