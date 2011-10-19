Recognize = function(points, useProtractor)
	{
		var NumTemplates = 16;
		var NumPoints = 64;
		var Origin = new Point(0,0);
		var Diagonal = Math.sqrt(SQ_WIDTH * SQ_WIDTH + SQ_HEIGHT * SQ_HEIGHT);
		var HalfDiagonal = 0.5 * Diagonal;
		var AngleRange = Deg2Rad(45.0);
		var AnglePrecision = Deg2Rad(2.0);
		
		points = Resample(points, NumPoints);
		var radians = IndicativeAngle(points);
		points = RotateBy(points, -radians);
		points = ScaleTo(points,SQ_WIDTH,SQ_HEIGHT);
		points = TranslateTo(points, Origin);
		var vector = Vectorize(points); // for Protractor
	
		var b = +Infinity;
		var t = 0;
		for (var name in GLYPH) // for each unistroke template
		{
			d = DistanceAtBestAngle(points, GLYPH[name], -AngleRange, +AngleRange, AnglePrecision);

			if (d < b)
			{
				b = d; // best (least) distance
				t = i; // unistroke template
			}
		}
		return ({name:});
		return new Result(this.Templates[t].Name, useProtractor ? 1.0 / b : 1.0 - b / HalfDiagonal);
	};
