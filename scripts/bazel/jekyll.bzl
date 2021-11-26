# this rule will do my jekyll build
def _jekyll_build_impl(ctx):
    print("target", ctx.label.name)

    out_file = ctx.actions.declare_directory("_site")

    ctx.actions.run_shell(
        inputs = ctx.files.srcs,
        outputs = [out_file],
        arguments = [],
        command = "bundle install",
    )
    return [DefaultInfo(files = depset([out_file]))]

jekyll_build = rule(
    implementation = _jekyll_build_impl,
    attrs = {
        "srcs": attr.label_list(),
    },
)

print("custom jekyll rule loaded")

